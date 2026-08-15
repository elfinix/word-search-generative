"""
FastAPI Main Application Module.
Modular entry point for PokéSearch API — powered by Supabase.
"""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import puzzles, scores, stats
from app.services.supabase_service import ping_supabase

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(
    title="PokéSearch Generative API",
    description="Generative Pokémon Word Search API powered by Online LLMs and Supabase",
    version="2.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url="/api/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


import os

@app.get("/api/health")
def health_check():
    model = os.getenv("GEMINI_MODEL", "Unknown")
    return {"status": "ok", "app": "PokéSearch Generative API v2", "model": model}


@app.get("/api/health/supabase")
async def supabase_health_check():
    """Check Supabase connectivity. Returns connected status and metadata."""
    logger.info("Supabase health check requested.")
    return await ping_supabase()


# Include Routers
app.include_router(puzzles.router, prefix="/api/puzzles", tags=["Puzzles"])
app.include_router(scores.router, prefix="/api/scores", tags=["Scores"])
app.include_router(stats.router, prefix="/api/stats", tags=["Stats"])
