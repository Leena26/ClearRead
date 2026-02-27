# ClearRead

ClearRead rewrites any text at a target reading level — Grade 3, 6, 9, or 12. Paste in an article, a document, or any block of text, pick a level, and get a simplified version back instantly using Llama 3.3 via the Groq API.

---

## Tech stack

| Layer    | Technology                   |
|----------|------------------------------|
| Frontend | React                        |
| Backend  | FastAPI + Uvicorn (Python 3) |
| LLM      | Llama 3.3 70B (Groq API)     |
| Fonts    | Inter, Lora (Google Fonts)   |

---

## Getting started

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- A free Groq API key — [console.groq.com](https://console.groq.com)

---

### 1. Clone the repo

```bash
git clone https://github.com/LeenaAbigailDany/ClearRead.git
cd ClearRead
```

### 2. Set up the backend

```bash
cd backend
pip install -r requirments.txt
```

Create a `.env` file in the `backend/` folder:

```
GROQ_API_KEY=your_api_key_here
```

Start the server:

```bash
uvicorn app.main:app --reload
```

API runs at `http://127.0.0.1:8000`

### 3. Set up the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

App opens at `http://localhost:3000`

---

## Project structure

```
ClearRead/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app, Groq client, /transform route
│   │   └── services/
│   │       └── text_transformer.py
│   ├── requirments.txt
│   └── .env                     # Not committed — add your GROQ_API_KEY here
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       └── App.css
└── README.md
```

---

## API reference

### `POST /transform`

Rewrites text at the given reading level using Llama 3.3.

**Request body**

```json
{
  "text": "The mitochondria is the powerhouse of the cell.",
  "reading_level": 3
}
```

| Field           | Type    | Description                          |
|-----------------|---------|--------------------------------------|
| `text`          | string  | The text to simplify                 |
| `reading_level` | integer | Target grade level — 3, 6, 9, or 12  |

**Response**

```json
{
  "transformed_text": "[LEVEL 3] The mitochondria gives the cell its energy."
}
```

---

### `GET /health`

Returns server status.

```json
{ "status": "ok" }
```

---

## Notes

- `.env` is excluded from version control. Never commit your API key.
- The Groq free tier is sufficient for development use.

---

Made by Leena Dany
