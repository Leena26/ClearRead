from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

class TransformRequest(BaseModel):
    text : str
    reading_level : int
    
class TransformResponse(BaseModel):
    transformed_text : str
    
@app.post("/transform", response_model=TransformResponse)
def transform(req : TransformRequest):
    return {
        "transformed_text": f"[LEVEL {req.reading_level}] {req.text}"
    }