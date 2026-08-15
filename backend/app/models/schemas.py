"""
Pydantic Schemas for API Request/Response Payloads (Pydantic v2).
All ORM models have been removed — Supabase is the data source.
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class PokemonWordInfo(BaseModel):
    """Metadata payload for target Pokémon words."""
    id: int
    name: str
    primary_type: str
    secondary_type: Optional[str] = None
    confidence_score: Optional[int] = 100

    model_config = ConfigDict(from_attributes=True)


class PlacedWordLocation(BaseModel):
    """Location metadata for a word placed on the grid."""
    word: str
    start_row: int = Field(..., ge=0, description="0-indexed start row")
    start_col: int = Field(..., ge=0, description="0-indexed start column")
    end_row: int = Field(..., ge=0, description="0-indexed end row")
    end_col: int = Field(..., ge=0, description="0-indexed end column")
    direction: str
    type_info: PokemonWordInfo


class PokemonListResponse(BaseModel):
    """List of generated Pokemon from the LLM."""
    pokemon_list: List[PokemonWordInfo]


class PuzzleGenerateRequest(BaseModel):
    """Payload to generate a puzzle from a given list."""
    difficulty: str = Field(pattern="^(easy|medium|hard)$")
    pokemon_list: List[PokemonWordInfo]


class PuzzleResponse(BaseModel):
    """Complete puzzle response payload."""
    id: str
    difficulty: str
    grid_size: int
    grid: List[List[str]]
    target_words: List[PokemonWordInfo]
    placed_solutions: List[PlacedWordLocation]


class WordVerifyRequest(BaseModel):
    """Payload to verify a found word."""
    word: str
    start_row: int
    start_col: int
    end_row: int
    end_col: int


class WordVerifyResponse(BaseModel):
    """Response payload for word verification."""
    is_valid: bool
    word: str
    message: str


class ScoreCreate(BaseModel):
    """Payload to submit a player high score."""
    player_name: str = Field(default="Trainer", max_length=30)
    difficulty: str
    time_seconds: int = Field(..., ge=0)
    score: int = Field(..., ge=0)


class ScoreResponse(BaseModel):
    """Response payload for score entry."""
    id: int
    player_name: str
    difficulty: str
    time_seconds: int
    score: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SummaryStats(BaseModel):
    """Aggregated game telemetry."""
    puzzles_completed: int
    words_found: int
