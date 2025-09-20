import faiss
import json

import numpy as np

from sentence_transformers import SentenceTransformer
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk

with open("corpus/wikipedia_chunks.json") as f:
    corpus_docs = json.load(f)
    
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
corpus_embeddings = embedding_model.encode(corpus_docs, convert_to_numpy=True)

dim = corpus_embeddings.shape[1]
faiss_index = faiss.IndexFlatL2(dim)
faiss_index.add(corpus_embeddings)

es = Elasticsearch(hosts=["http://localhost:9200"])

def index_corpus_bm25(docs):
    actions = [
        {"_index": "facts", "_source": {"text": doc}} for doc in docs
    ]
    bulk(es, actions)
    es.indices.refresh(index="facts")

index_corpus_bm25(corpus_docs)

def retrieve_bm25(query, top_k=5):
    body = {
        "query": {"match": {"text": query}},
        "size": top_k
    }
    res = es.search(index="facts", body=body)
    return [{"source": "BM25 Corpus", "text": hit["_source"]["text"]} for hit in res["hits"]["hits"]]

def retrieve_faiss(query, top_k=5):
    q_emb = embedding_model.encode([query], convert_to_numpy=True)
    D, I = faiss_index.search(q_emb, top_k)
    return [{"source": "FAISS Corpus", "text": corpus_docs[i]} for i in I[0]]

def hybrid_retrieve(claim, top_k=5, weights=(0.6, 0.4)):
    faiss_docs = retrieve_faiss(claim, top_k=top_k)
    bm25_docs = retrieve_bm25(claim, top_k=top_k)

    # Score normalization placeholder
    # For now we just merge and remove duplicates
    combined = {d['text']: d for d in faiss_docs + bm25_docs}
    return list(combined.values())[:top_k]