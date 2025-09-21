import json
import os

from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
# from RAG_Data.corpus_loader import load_corpus
from fastapi.middleware.cors import CORSMiddleware
from RAG_Data.llmverdict import verify_claim_with_mistral
from RAG_Data.retrival import hybrid_retrieve
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Hybrid Misinformation Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv('FRONTEND_URL'), os.getenv('WHATSAPP_SERVER')],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CORPUS_LOADED: bool = False

class ClaimRequest(BaseModel):
    claim: str

class EvidenceItem(BaseModel):
    source: str
    text: str
    url: str = None

class FactCheckResponse(BaseModel):
    status: str
    correction: str
    evidence: list

@app.post("/fact-check", response_model=FactCheckResponse)
def fact_check_claim(request: ClaimRequest):
    print(f"Received claim: {request.claim}")
    
    # if not CORPUS_LOADED:
    #     print("Loading corpus...")
    #     load_corpus()
    #     CORPUS_LOADED = True
        
    claim = request.claim
    
    print("Retrieving evidence...")
    evidence = hybrid_retrieve(claim, top_k=5)

    seen = set()
    unique_evidence = []
    for e in evidence:
        if e['text'] not in seen:
            unique_evidence.append(e)
            seen.add(e['text'])
        
        if len(unique_evidence) >= 10:
            break
        
    print("Calling LLM....")
    llm_result = verify_claim_with_mistral(claim, unique_evidence)
    
    print(llm_result)
    try:
        verdict_json = json.loads(llm_result)
    except Exception:
        verdict_json = {"status": "ERROR", "correction": "", "justification": llm_result}

    response = {
        "correction": verdict_json.get("correction", ""),
        "status": verdict_json.get("status", ""),
        "evidence": unique_evidence
    }

    return response