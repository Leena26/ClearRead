# ClearRead

A text simplification tool that rewrites any content at a chosen reading level — Grade 3, 6, 9, or 12 — powered by Llama 3.3 via Groq.

## Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React                             |
| Backend  | FastAPI + Uvicorn (Python)        |
| LLM      | Llama 3.3 70B via Groq API        |

## Running locally

### 1. Environment setup

Create a `.env` file inside the `backend/` folder:

```
GROQ_API_KEY=your_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

### 2. Backend

```bash
cd backend
pip install -r requirments.txt
uvicorn app.main:app --reload
```

API runs at `http://127.0.0.1:8000`

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`

## Project structure

```
ClearRead/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI routes, Groq client
│   │   └── services/
│   │       └── text_transformer.py
│   ├── requirments.txt
│   └── .env                        # GROQ_API_KEY (not committed)
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        └── App.css
```

## API

### `POST /transform`

**Request**
```json
{
  "text": "The mitochondria is the powerhouse of the cell.",
  "reading_level": 3
}
```

**Response**
```json
{
  "transformed_text": "The part of the cell called the mitochondria gives it energy to work."
}
```

### `GET /health`

Returns `{ "status": "ok" }` — useful for checking the server is up.

---

Made by Leena Dany
