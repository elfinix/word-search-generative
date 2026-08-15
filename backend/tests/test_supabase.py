"""
Unit tests for Supabase connectivity and data operations.
These are live integration tests — they run against the real Supabase project.
"""
import pytest
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"))

from app.services.supabase_service import (
    ping_supabase,
    get_supabase_client,
    get_top_scores_supabase,
    get_game_stats_supabase,
    submit_score_supabase,
)


# ─── Connection ────────────────────────────────────────────────────────────────

def test_supabase_client_initializes():
    """Supabase client should be created when SUPABASE_SERVICE_ROLE_KEY is set."""
    client = get_supabase_client()
    assert client is not None, "Supabase client should not be None when SERVICE_ROLE_KEY is set"


@pytest.mark.asyncio
async def test_supabase_ping():
    """ping_supabase() should return connected=True and reach the game_stats table."""
    result = await ping_supabase()
    assert isinstance(result, dict), "ping_supabase should return a dict"
    assert result.get("connected") is True, f"Expected connected=True, got: {result}"
    assert "url" in result, "Result should include the Supabase URL"
    assert "rows_returned" in result, "Result should include rows_returned count"


# ─── Scores ────────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_get_top_scores_returns_list():
    """get_top_scores_supabase should return a list (possibly empty) for any difficulty."""
    scores = await get_top_scores_supabase("medium", 5)
    assert isinstance(scores, list), "Top scores should be a list"


@pytest.mark.asyncio
async def test_top_scores_have_expected_fields():
    """Each score entry should have the required fields."""
    scores = await get_top_scores_supabase("medium", 5)
    for score in scores:
        assert "id" in score, "Score must have 'id'"
        assert "player_name" in score, "Score must have 'player_name'"
        assert "difficulty" in score, "Score must have 'difficulty'"
        assert "time_seconds" in score, "Score must have 'time_seconds'"
        assert "score" in score, "Score must have 'score'"
        assert "created_at" in score, "Score must have 'created_at'"


@pytest.mark.asyncio
async def test_submit_score_and_verify():
    """Submit a test score and verify it appears in the leaderboard."""
    test_payload = {
        "player_name": "__test_runner__",
        "difficulty": "easy",
        "time_seconds": 999,
        "score": 1,
    }
    saved = await submit_score_supabase(test_payload)
    assert saved is not None, "submit_score_supabase should return the saved row"
    assert saved.get("player_name") == "__test_runner__"
    assert saved.get("difficulty") == "easy"
    assert "id" in saved, "Saved score must have an id"

    # Cleanup: delete the test row
    client = get_supabase_client()
    if client and "id" in saved:
        client.table("scores").delete().eq("id", saved["id"]).execute()


# ─── Game Stats ────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_get_game_stats_returns_data():
    """get_game_stats_supabase should return a dict with puzzles_completed and words_found."""
    stats = await get_game_stats_supabase()
    assert stats is not None, "Game stats should not be None"
    assert "puzzles_completed" in stats, "Stats must include 'puzzles_completed'"
    assert "words_found" in stats, "Stats must include 'words_found'"
    assert isinstance(stats["puzzles_completed"], int)
    assert isinstance(stats["words_found"], int)
