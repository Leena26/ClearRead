# ClearRead

A text simplification tool that rewrites any content at a chosen reading level — Grade 3, 6, 9, or 12.

## Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Frontend | React                       |
| Backend  | FastAPI + Uvicorn (Python)  |
| Fonts    | Inter · Lora (Google Fonts) |

## Running locally

### Backend

```bash
cd backend
pip install -r requirments.txt
uvicorn app.main:app --reload
```

API runs at `http://127.0.0.1:8000`

### Frontend

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
│   │   ├── main.py                 # FastAPI routes & models
│   │   └── services/
│   │       └── text_transformer.py # Simplification logic
│   └── requirments.txt
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
  "transformed_text": "The mitochondria gives the cell its energy."
}
```

---

Made by Leena Dany
