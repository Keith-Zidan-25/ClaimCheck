import os
import requests

MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"  # Free tier API endpoint

def verify_claim_with_mistral(claim, evidence_texts):
    prompt = f"""
    You are a fact-checking assistant.
    Claim: "{claim}"

    Evidence:
    {chr(10).join([f"- {e['text']}" for e in evidence_texts])}

    Task:
    1. Determine if the claim is SUPPORTED / REFUTED / INSUFFICIENT.
    2. Provide a corrected version if REFUTED or INSUFFICIENT.
    3. Justify briefly using the evidence.
    """
    
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "mistral-7b-instruct",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 64,
        "temperature": 0.0
    }
    response = requests.post(MISTRAL_API_URL, headers=headers, json=data)
    
    if response.status_code == 200:
        res_json = response.json()
        return res_json['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code} - {response.text}"
