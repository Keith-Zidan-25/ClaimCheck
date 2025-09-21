import requests
import os

from dotenv import load_dotenv

load_dotenv()

def retrieve_wikipedia(claim, top_k=3):
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "list": "search",
        "srsearch": claim,
        "utf8": "",
        "format": "json"
    }
    headers = {
        "User-Agent": "VeriFix-FactChecker/1.0 (contact: verifix.web@gmail.com)"
    }
    
    resp = requests.get(url, params=params, headers=headers).json()
    results = resp.get("query", {}).get("search", [])
    
    return [{"source": "Wikipedia API", "text": r["snippet"]}
            for r in results[:top_k]]

def retrieve_google_search(claim, top_k=3):
    api_key = os.getenv("GOOGLE_API_KEY")
    cse_id = os.getenv("GOOGLE_CSE_ID")  # Your Custom Search Engine ID

    if not api_key or not cse_id:
        return []

    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": api_key,
        "cx": cse_id,
        "q": claim,
        "num": top_k
    }

    try:
        resp = requests.get(url, params=params).json()
        items = resp.get("items", [])
        results = []
        for i in items:
            results.append({
                "source": i.get("displayLink", "Web"),
                "text": i.get("snippet", ""),
                "url": i.get("link")
            })
        return results

    except Exception as e:
        print(f"Google Search API error: {e}")
        return []


def retrieve_gnews(claim, top_k=3):
    key = os.getenv("GNEWS_API_KEY")
    
    if not key:
        return []
    url = f"https://gnews.io/api/v4/search?q={claim}&token={key}&max={top_k}"
    
    try:
        resp = requests.get(url).json()
        return [{"source": a["source"]["name"], "text": a["title"], "url": a["url"]}
                for a in resp.get("articles", [])]
    except:
        return []