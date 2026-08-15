# PokéSearch — Generative Pokémon Word Search

A responsive, dynamic Pokémon Word Search web application built with **FastAPI**, **SQLite**, and **ReactJS**. Designed using enterprise frontend principles (SRP, Custom Hooks, Context API, Service Abstraction Layer).

---

## 🏗️ Project Structure

```
word-search-generative/
├── backend/
│   ├── venv/           # Python Virtual Environment
│   ├── database.py     # SQLite Database setup
│   ├── models.py       # SQLAlchemy ORM schemas (Pokemon, Score, GameStat)
│   ├── schemas.py      # Pydantic request/response schemas
│   ├── generator.py    # 8-Directional word matrix generator
│   ├── seed_data.py    # Database initial seed script
│   ├── main.py         # FastAPI application & REST endpoints
│   └── requirements.txt# Backend dependencies
└── frontend/
    ├── src/
    │   ├── services/   # Network & API Service Layer
    │   ├── context/    # Theme & Game Context Providers
    │   ├── hooks/      # Custom Utility Hooks (useTimer, useToast)
    │   ├── pages/      # LandingPage & PlayPage assemblies
    │   └── components/ # UI Components
    └── package.json
```

---

## 📌 API Documentation (Swagger & ReDoc)

When the FastAPI server is running (`http://127.0.0.1:8000`):

- **Swagger UI Interactive Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc API Documentation**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **OpenAPI JSON Schema**: [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json)

---

## 🚀 Local Quickstart

### 1. Start Backend (FastAPI with Virtual Environment)

```powershell
cd backend
# Activate venv & run server
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Start Frontend (ReactJS + Vite)

```powershell
cd frontend
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

App will run at `http://localhost:5173`.
