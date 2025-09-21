import json

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from RAG_Data.external import retrieve_wikipedia, retrieve_google_search, retrieve_gnews

with open("corpus/wikipedia_chunks.json") as f:
    corpus_docs = json.load(f)

doc_list = [c['text'] for c in corpus_docs]

tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(doc_list)

def retrieve_tfidf(query, top_k=5):
    q_vec = tfidf.transform([query])
    cosine_sim = linear_kernel(q_vec, tfidf_matrix).flatten()
    top_idx = cosine_sim.argsort()[::-1][:top_k]
    return [{"source": "TF-IDF Corpus", "text": doc_list[i]} for i in top_idx]

def hybrid_retrieve(claim, top_k=5):
    docs = []
    docs.extend(retrieve_tfidf(claim, top_k))
    docs.extend(retrieve_wikipedia(claim, top_k))
    # docs.extend(retrieve_google_search(claim, top_k))
    # docs.extend(retrieve_gnews(claim, top_k))
    
    seen, unique_docs = set(), []
    for d in docs:
        if d["text"] not in seen:
            unique_docs.append(d)
            seen.add(d["text"])
    return unique_docs[:top_k]