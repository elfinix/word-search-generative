import pytest
from app.services.llm_service import generate_pokemon_objects_from_prompt, parse_pokemon_objects

@pytest.mark.asyncio
async def test_llm_parsing():
    """Test the robust JSON parsing logic."""
    simulated_response = '''
    * Thinking process trace...
    * I will output JSON now.
    ```json
    [
        {"id": 25, "name": "PIKACHU", "primary_type": "Electric"},
        {"id": 6, "name": "CHARIZARD", "primary_type": "Fire", "secondary_type": "Flying"}
    ]
    ```
    '''
    result = parse_pokemon_objects(simulated_response)
    assert isinstance(result, list)
    assert len(result) == 2
    assert result[0]["name"] == "PIKACHU"
    assert result[0]["primary_type"] == "Electric"

@pytest.mark.asyncio
async def test_generate_pokemon_live():
    """Live LLM API test (only runs if GEMMA_API_KEY is valid and not dummy)."""
    import os
    from dotenv import load_dotenv

    # Load actual environment variables from .env if present
    load_dotenv()
    try:
        objects = await generate_pokemon_objects_from_prompt("Legendary Pokémon", 5)
        assert isinstance(objects, list)
        assert len(objects) == 5
        assert all(isinstance(o, dict) for o in objects)
        assert "name" in objects[0]
        assert "primary_type" in objects[0]
    except Exception as e:
        pytest.fail(f"LLM API call failed: {e}")
