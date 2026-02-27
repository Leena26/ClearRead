from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
async def transform(req : TransformRequest):
    prompt = f"""
    You are an expert in cognitive accessibility. 
    Rewrite the user's text for a {req.reading_level} student.
    - Use very simple words and short sentences.
    - Use bullet points for complex lists.
    - Keep the meaning exactly the same.
    - Return ONLY the rewritten text.
    """
    
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": req.text}
        ],
    )
    ai_answer = completion.choices[0].message.content
    return {
        "transformed_text": f"[LEVEL {req.reading_level}] {ai_answer}"
    }