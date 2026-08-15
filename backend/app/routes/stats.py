import logging
from fastapi import APIRouter
from app.models.schemas import SummaryStats
from app.services.supabase_service import get_game_stats_supabase

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("", response_model=SummaryStats)
async def get_stats():
    """Retrieve aggregate game statistics from Supabase."""
    logger.info("Game stats requested.")
    stats = await get_game_stats_supabase()
    if stats:
        return SummaryStats(
            puzzles_completed=stats.get("puzzles_completed", 0),
            words_found=stats.get("words_found", 0),
        )
    return SummaryStats(puzzles_completed=0, words_found=0)
