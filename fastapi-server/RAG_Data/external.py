import requests
import os

def retrieve_wikipedia(claim, top_k=3):
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query", "list": "search",
        "srsearch": claim, "utf8": "", "format": "json"
    }
    resp = requests.get(url, params=params).json()
    results = resp.get("query", {}).get("search", [])
    return [{"source": "Wikipedia API", "text": r["snippet"]} for r in results[:top_k]]

def retrieve_google_factcheck(claim, top_k=3):
    key = os.getenv("GOOGLE_API_KEY")
    
    if not key:
        return []
    url = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
    params = {"query": claim, "key": key}
    
    try:
        resp = requests.get(url, params=params).json()
        items = resp.get("claims", [])[:top_k]
        
        return [{"source": i.get("claimReview", [{}])[0].get("publisher", {}).get("name", "FactCheck"),
                 "text": i.get("text"),
                 "url": i.get("claimReview", [{}])[0].get("url")}
                for i in items]
    except:
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