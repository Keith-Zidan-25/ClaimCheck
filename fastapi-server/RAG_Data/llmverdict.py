import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def verify_claim_with_mistral(claim, evidence_texts):
    prompt = f"""
    You are a fact-checking assistant.
    Claim: "{claim}"

    Evidence:
    {chr(10).join([f"- {e['text']}" for e in evidence_texts])}

    Task:
    Respond strictly in the following JSON format:
    {{
      "status": "SUPPORTED | REFUTED | INSUFFICIENT",
      "correction": "Only if status is REFUTED or INSUFFICIENT, otherwise empty",
    }}
    """
    
    response = client.chat.completions.create(
        model="mistralai/devstral-small-2505:free",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=64,
        temperature=0.0
    )
    
    try:
        result = response.choices[0].message.content.strip()
        return result
    except Exception as e:
        return f"Error: {str(e)}"

