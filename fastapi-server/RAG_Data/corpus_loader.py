import json
import wikipediaapi
import nltk
import os

from nltk.tokenize import sent_tokenize
from tqdm import tqdm

nltk.download('punkt')

OUTPUT_FILE = "corpus/wikipedia_chunks.json"
CHUNK_SIZE = 100
CATEGORIES = [
    "Science",
    "Technology",
    "Health",
    "World Politics",
    "Environment"
]
MAX_ARTICLES_PER_CATEGORY = 10

wiki_wiki = wikipediaapi.Wikipedia(user_agent='VeriFix-FactChecker/1.0 (contact: verifix.web@gmail.com)',language="en")
corpus_chunks = []

def chunk_text(text, chunk_size=CHUNK_SIZE):
    """Split text into chunks of ~chunk_size words."""
    sentences = sent_tokenize(text)
    chunks = []
    current_chunk = []
    word_count = 0
    
    for sentence in sentences:
        words = sentence.split()
        word_count += len(words)
        current_chunk.append(sentence)
        
        if word_count >= chunk_size:
            chunks.append(" ".join(current_chunk))
            current_chunk = []
            word_count = 0
    
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def fetch_category(category_name):
    cat_page = wiki_wiki.page(category_name)
    
    if not cat_page.exists():
        print(f"Category {category_name} does not exist")
        return []
    
    articles = []
    for title in cat_page.categorymembers.keys():
        page = wiki_wiki.page(title)
        
        if page.exists() and not page.is_category:
            articles.append(page)
            
            if len(articles) >= MAX_ARTICLES_PER_CATEGORY:
                break
    return articles

def load_corpus():
    for category in CATEGORIES:
        print(f"Fetching articles for category: {category}")
        articles = fetch_category(f"Category:{category}")
        
        for article in tqdm(articles):
            chunks = chunk_text(article.text)
            corpus_chunks.extend(chunks)

corpus_chunks = list(set(corpus_chunks))
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(corpus_chunks, f, ensure_ascii=False, indent=2)

print(f"Saved {len(corpus_chunks)} chunks to {OUTPUT_FILE}")