"""
Supabase Data Source Service.
Primary data store for scores and game statistics.
Project: https://iudaicigclucruffjfqk.supabase.co
"""
import os
import logging
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

logger = logging.getLogger(__name__)

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://iudaicigclucruffjfqk.supabase.co")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

_supabase_client: Optional[Client] = None


def get_supabase_client() -> Optional[Client]:
    """Return active Supabase client instance (singleton)."""
    global _supabase_client
    if _supabase_client is None and SUPABASE_SERVICE_ROLE_KEY:
        try:
            _supabase_client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
            logger.info("Successfully connected to Supabase using Service Role Key!")
        except Exception as e:
            logger.error(f"Error initializing Supabase client: {e}")
    return _supabase_client


async def ping_supabase() -> Dict[str, Any]:
    """
    Verify Supabase connectivity by performing a lightweight read on game_stats.
    Returns a status dict with connected bool and optional error message.
    """
    client = get_supabase_client()
    if not client:
        return {"connected": False, "error": "Supabase client could not be initialized (missing SUPABASE_SERVICE_ROLE_KEY?)"}
    try:
        logger.info("Pinging Supabase...")
        res = client.table("game_stats").select("id").limit(1).execute()
        logger.info("Supabase ping successful.")
        return {"connected": True, "url": SUPABASE_URL, "rows_returned": len(res.data)}
    except Exception as e:
        logger.error(f"Supabase ping failed: {e}")
        return {"connected": False, "error": str(e)}


# ─── Scores ───────────────────────────────────────────────────────────────────

async def submit_score_supabase(score_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Persist a score record to the Supabase scores table."""
    client = get_supabase_client()
    if not client:
        logger.warning("Supabase client not available. Score not saved.")
        return None
    try:
        logger.info(f"Submitting score to Supabase: {score_data}")
        res = client.table("scores").insert(score_data).execute()
        if res.data and len(res.data) > 0:
            logger.info(f"Score saved to Supabase with id={res.data[0].get('id')}")
            return res.data[0]
    except Exception as e:
        logger.error(f"Failed to insert score into Supabase: {e}")
    return None


async def get_top_scores_supabase(difficulty: str = "medium", limit: int = 10) -> List[Dict[str, Any]]:
    """Retrieve leaderboard scores from Supabase, sorted by score desc then time asc."""
    client = get_supabase_client()
    if not client:
        logger.warning("Supabase client not available. Returning empty leaderboard.")
        return []
    try:
        logger.info(f"Fetching top {limit} scores for difficulty='{difficulty}' from Supabase...")
        res = (
            client.table("scores")
            .select("*")
            .eq("difficulty", difficulty)
            .order("score", desc=True)
            .order("time_seconds", desc=False)
            .limit(limit)
            .execute()
        )
        if res.data is not None:
            logger.info(f"Retrieved {len(res.data)} score entries from Supabase.")
            return res.data
    except Exception as e:
        logger.error(f"Failed to fetch scores from Supabase: {e}")
    return []


# ─── Game Stats ───────────────────────────────────────────────────────────────

async def get_game_stats_supabase() -> Optional[Dict[str, Any]]:
    """Retrieve the single game_stats row from Supabase."""
    client = get_supabase_client()
    if not client:
        logger.warning("Supabase client not available. Cannot fetch game stats.")
        return None
    try:
        logger.info("Fetching game stats from Supabase...")
        res = client.table("game_stats").select("*").limit(1).execute()
        if res.data and len(res.data) > 0:
            logger.info(f"Game stats retrieved: {res.data[0]}")
            return res.data[0]
        # No row yet — create a default one
        logger.info("No game_stats row found; creating default.")
        insert_res = client.table("game_stats").insert({"puzzles_completed": 0, "words_found": 0}).execute()
        if insert_res.data:
            return insert_res.data[0]
    except Exception as e:
        logger.error(f"Failed to fetch game stats from Supabase: {e}")
    return None


async def increment_game_stats_supabase(words_found_delta: int = 0) -> None:
    """Atomically increment puzzles_completed (+1) and words_found (+delta) in Supabase."""
    client = get_supabase_client()
    if not client:
        logger.warning("Supabase client not available. Game stats not updated.")
        return
    try:
        # Fetch current values
        res = client.table("game_stats").select("id, puzzles_completed, words_found").limit(1).execute()
        if not res.data:
            logger.warning("No game_stats row found to update.")
            return

        row = res.data[0]
        new_puzzles = row["puzzles_completed"] + 1
        new_words   = row["words_found"] + words_found_delta

        client.table("game_stats").update({
            "puzzles_completed": new_puzzles,
            "words_found": new_words,
        }).eq("id", row["id"]).execute()

        logger.info(f"Game stats updated: puzzles_completed={new_puzzles}, words_found={new_words}")
    except Exception as e:
        logger.error(f"Failed to update game stats in Supabase: {e}")
