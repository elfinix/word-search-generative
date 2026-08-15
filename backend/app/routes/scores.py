from typing import List
from fastapi import APIRouter, Query
import logging

from app.models.schemas import ScoreCreate, ScoreResponse
from app.services.supabase_service import submit_score_supabase, get_top_scores_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("", response_model=ScoreResponse)
async def submit_score(payload: ScoreCreate):
    """Submit a player score to Supabase."""
    score_dict = {
        "player_name": payload.player_name or "Trainer",
        "difficulty": payload.difficulty,
        "time_seconds": payload.time_seconds,
        "score": payload.score,
    }
    logger.info(f"Score submission received: {score_dict}")
    saved = await submit_score_supabase(score_dict)
    if saved:
        return saved
    # Fallback: return payload mirroring request data with a placeholder id
    logger.warning("Score could not be persisted to Supabase. Returning payload as-is.")
    return {**score_dict, "id": 0, "created_at": "1970-01-01T00:00:00+00:00"}


@router.get("/top", response_model=List[ScoreResponse])
async def get_top_scores(
    difficulty: str = Query("medium"),
    limit: int = Query(10, ge=1, le=50),
):
    """Retrieve leaderboard scores from Supabase."""
    logger.info(f"Leaderboard requested: difficulty={difficulty}, limit={limit}")
    return await get_top_scores_supabase(difficulty, limit)
