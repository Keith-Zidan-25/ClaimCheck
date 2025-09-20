from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from RAG_Data.corpus_loader import load_corpus
from RAG_Data.llmverdict import verify_claim_with_mistral
from RAG_Data.retrival import hybrid_retrieve
from RAG_Data.external import retrieve_wikipedia, retrieve_google_factcheck, retrieve_gnews

app = FastAPI(title="Hybrid Misinformation Detection API")
CORPUS_LOADED: bool = False

class ClaimRequest(BaseModel):
    claim: str

class EvidenceItem(BaseModel):
    source: str
    text: str
    url: str = None

class FactCheckResponse(BaseModel):
    verdict: str
    correction: str
    evidence: List[EvidenceItem]

@app.post("/fact-check", response_model=FactCheckResponse)
def fact_check_claim(request: ClaimRequest):
    print(f"Received claim: {request.claim}")
    
    if not CORPUS_LOADED:
        print("Loading corpus...")
        load_corpus()
        CORPUS_LOADED = True
        
    claim = request.claim
    
    print("Retrieving evidence...")
    evidence = hybrid_retrieve(claim, top_k=5)
    evidence += retrieve_wikipedia(claim)
    # evidence += retrieve_google_factcheck(claim)
    evidence += retrieve_gnews(claim)

    seen = set()
    unique_evidence = []
    for e in evidence:
        if e['text'] not in seen:
            unique_evidence.append(e)
            seen.add(e['text'])
        
        if len(unique_evidence) >= 10:
            break
        
    print("Calling LLM....")
    # LLM verification
    llm_result = verify_claim_with_mistral(claim, unique_evidence)

    return {
        "verdict": llm_result.get("verdict", "UNKNOWN"),
        "correction": llm_result.get("correction", ""),
        "evidence": unique_evidence
    }