from fastapi import APIRouter, HTTPException, Query
import logging
import random

from app.models.schemas import PuzzleResponse, WordVerifyRequest, WordVerifyResponse, PokemonListResponse, PuzzleGenerateRequest
from app.services.generator import WordSearchGenerator
from app.services.llm_service import generate_pokemon_objects_from_prompt, LLMError
from app.services.supabase_service import increment_game_stats_supabase

logger = logging.getLogger(__name__)

router = APIRouter()

DEFAULT_POKEMON_OBJECTS = [
    {"id": 25, "name": "PIKACHU", "primary_type": "Electric", "secondary_type": None},
    {"id": 6, "name": "CHARIZARD", "primary_type": "Fire", "secondary_type": "Flying"},
    {"id": 1, "name": "BULBASAUR", "primary_type": "Grass", "secondary_type": "Poison"},
    {"id": 7, "name": "SQUIRTLE", "primary_type": "Water", "secondary_type": None},
    {"id": 94, "name": "GENGAR", "primary_type": "Ghost", "secondary_type": "Poison"},
    {"id": 150, "name": "MEWTWO", "primary_type": "Psychic", "secondary_type": None},
    {"id": 133, "name": "EEVEE", "primary_type": "Normal", "secondary_type": None},
    {"id": 143, "name": "SNORLAX", "primary_type": "Normal", "secondary_type": None},
    {"id": 149, "name": "DRAGONITE", "primary_type": "Dragon", "secondary_type": "Flying"},
    {"id": 448, "name": "LUCARIO", "primary_type": "Fighting", "secondary_type": "Steel"},
    {"id": 445, "name": "GARCHOMP", "primary_type": "Dragon", "secondary_type": "Ground"},
    {"id": 658, "name": "GRENINJA", "primary_type": "Water", "secondary_type": "Dark"},
    {"id": 384, "name": "RAYQUAZA", "primary_type": "Dragon", "secondary_type": "Flying"},
    {"id": 257, "name": "BLAZIKEN", "primary_type": "Fire", "secondary_type": "Fighting"}
]


class PokeObject:
    def __init__(self, d):
        self.id = d["id"]
        self.name = d["name"]
        self.primary_type = d["primary_type"]
        self.secondary_type = d.get("secondary_type")
        self.confidence_score = d.get("confidence_score", 100)


@router.get("/generate", response_model=PuzzleResponse)
async def generate_puzzle(
    difficulty: str = Query("medium", pattern="^(easy|medium|hard)$"),
):
    """Generate puzzle using hardcoded fallback list."""
    logger.info(f"Generating fallback puzzle with difficulty: {difficulty}")
    diff_count = 6 if difficulty == "easy" else 8 if difficulty == "medium" else 12

    sample = random.sample(DEFAULT_POKEMON_OBJECTS, min(diff_count, len(DEFAULT_POKEMON_OBJECTS)))
    pool_objects = [PokeObject(d) for d in sample]

    puzzle = WordSearchGenerator.generate_puzzle(pool_objects, difficulty)
    return puzzle


@router.post("/generate-list", response_model=PokemonListResponse)
async def generate_pokemon_list(
    prompt: str = Query(..., description="Free-text custom topic query"),
    difficulty: str = Query("medium", pattern="^(easy|medium|hard)$"),
):
    """
    Call Online LLM to generate a list of Pokemon based on a prompt.
    """
    logger.info(f"Endpoint hit: /generate-list for prompt: '{prompt}', difficulty: {difficulty}")
    diff_count = 6 if difficulty == "easy" else 8 if difficulty == "medium" else 12

    try:
        llm_objects = await generate_pokemon_objects_from_prompt(prompt, diff_count)

        if not llm_objects:
            raise HTTPException(status_code=400, detail="Could not match any valid Pokemon for that prompt.")

        return PokemonListResponse(pokemon_list=llm_objects)

    except LLMError as e:
        logger.error(f"LLM Error during prompt generation: {e}")
        raise HTTPException(status_code=e.status_code, detail=str(e))
    except Exception as e:
        logger.error(f"Error generating custom puzzle list: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate custom puzzle list: {str(e)}")


@router.post("/generate-from-list", response_model=PuzzleResponse)
async def generate_puzzle_from_list(
    payload: PuzzleGenerateRequest
):
    """
    Generate word search puzzle using a provided list of Pokemon objects.
    """
    logger.info(f"Endpoint hit: /generate-from-list. Received {len(payload.pokemon_list)} Pokemon objects. Difficulty: {payload.difficulty}")
    try:
        pool_objects = [PokeObject(p.model_dump()) for p in payload.pokemon_list]
        logger.info("Handing off to WordSearchGenerator...")
        puzzle = WordSearchGenerator.generate_puzzle(pool_objects, payload.difficulty)
        logger.info("Puzzle generation successful.")
        return puzzle

    except ValueError as e:
        logger.warning(f"Validation Error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error generating puzzle from list: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate puzzle from list: {str(e)}")


@router.post("/verify", response_model=WordVerifyResponse)
async def verify_word(payload: WordVerifyRequest):
    """Verify a found word and increment the words_found counter in Supabase."""
    clean_word = payload.word.upper().strip()
    logger.info(f"Word verified: {clean_word}")
    await increment_game_stats_supabase(words_found_delta=1)
    return WordVerifyResponse(
        is_valid=True,
        word=clean_word,
        message=f"Success! Found {clean_word}.",
    )
