"""
Powered by Online LLMs
Sends POST requests to https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}
"""
import os
import re
import json
import httpx
import logging
import random
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "models/gemini-3.5-flash-lite")


class LLMError(Exception):
    def __init__(self, message: str, status_code: int = 500):
        super().__init__(message)
        self.status_code = status_code


def parse_pokemon_objects(text: str) -> List[Dict[str, Any]]:
    """Parse JSON array of Pokemon objects from LLM output."""
    json_match = re.search(r"\[.*?\]", text, re.DOTALL)
    if json_match:
        try:
            parsed = json.loads(json_match.group(0))
            if isinstance(parsed, list) and len(parsed) > 0:
                valid_objects = []
                for p in parsed:
                    if isinstance(p, dict) and "name" in p:
                        valid_objects.append({
                            "id": p.get("id", random.randint(100, 900)),
                            "name": str(p["name"]).upper().strip().replace(" ", "").replace("-", ""),
                            "primary_type": str(p.get("primary_type", "Normal")).capitalize(),
                            "secondary_type": str(p.get("secondary_type")).capitalize() if p.get("secondary_type") else None,
                            "confidence_score": int(p.get("confidence_score", 100))
                        })
                return valid_objects
        except Exception:
            pass
    return []


async def generate_pokemon_objects_from_prompt(user_prompt: str, target_count: int = 8) -> List[Dict[str, Any]]:
    """
    Sends user free-text query to an Online LLM to retrieve matching Pokémon objects.
    Handles thinking parts, response parsing, and error codes (400, 403, 404, 429).
    """
    logger.info(f"LLM Service invoked. Prompt: '{user_prompt}', Target count: {target_count}")

    if not GEMINI_API_KEY:
        logger.warning("GEMINI_API_KEY not set. Returning default fallback list.")
        return [
            {"id": 25, "name": "PIKACHU", "primary_type": "Electric", "secondary_type": None, "confidence_score": 100},
            {"id": 6, "name": "CHARIZARD", "primary_type": "Fire", "secondary_type": "Flying", "confidence_score": 100},
            {"id": 257, "name": "BLAZIKEN", "primary_type": "Fire", "secondary_type": "Fighting", "confidence_score": 100},
            {"id": 384, "name": "RAYQUAZA", "primary_type": "Dragon", "secondary_type": "Flying", "confidence_score": 100},
            {"id": 448, "name": "LUCARIO", "primary_type": "Fighting", "secondary_type": "Steel", "confidence_score": 100},
            {"id": 445, "name": "GARCHOMP", "primary_type": "Dragon", "secondary_type": "Ground", "confidence_score": 100},
            {"id": 150, "name": "MEWTWO", "primary_type": "Psychic", "secondary_type": None, "confidence_score": 100},
            {"id": 94, "name": "GENGAR", "primary_type": "Ghost", "secondary_type": "Poison", "confidence_score": 100}
        ][:target_count]

    model_endpoint_path = GEMINI_MODEL if GEMINI_MODEL.startswith("models/") else f"models/{GEMINI_MODEL}"
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/{model_endpoint_path}:generateContent?key={GEMINI_API_KEY}"

    # Optimization: Ask the LLM to generate a slightly larger candidate pool to pick the best ones from
    generation_pool_count = target_count + 4

    system_instruction = (
        "<|think|>\n"
        "Keep your internal <|channel>thought block extremely brief and concise.\n"
        f"List exactly {generation_pool_count} Pokémon matching prompt: '{user_prompt}'. "
        f"Assign an appropriate confidence_score (0-100) reflecting how well they fit the description. "
        f"Return ONLY a valid JSON array of objects. Do NOT include any explanations or markdown blocks. "
        f"Each object must have the following structure: "
        f"{{\"id\": 25, \"name\": \"PIKACHU\", \"primary_type\": \"Electric\", \"secondary_type\": null, \"confidence_score\": 95}}"
    )

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{
                    "text": f"Generate a list of Pokémon matching: '{user_prompt}'"
                }]
            }
        ],
        "systemInstruction": {
            "parts": [{
                "text": system_instruction
            }]
        },
        "generationConfig": {
            "temperature": 0.1,
            "responseMimeType": "application/json",
            "thinkingConfig": {
                "include_thoughts": "False"
            }
        }
    }

    try:
        logger.info(f"Sending request to Online LLM: {GEMINI_MODEL}...")
        async with httpx.AsyncClient(timeout=90.0) as client:
            response = await client.post(endpoint, json=payload)
            logger.info(f"Received response from Online LLM. Status code: {response.status_code}")

            if response.status_code == 400:
                logger.error(f"LLM Error 400: Invalid request format. Response: {response.text}")
                raise LLMError("Invalid prompt format. Please refine your search text.", 400)
            elif response.status_code == 403:
                logger.error("LLM Error 403: API key authentication failed.")
                raise LLMError("API key authentication failed.", 403)
            elif response.status_code == 404:
                logger.error("LLM Error 404: Model not found.")
                raise LLMError(f"Model {GEMINI_MODEL} not found.", 404)
            elif response.status_code == 429:
                logger.error("LLM Error 429: Rate limit exceeded.")
                raise LLMError("Rate limit exceeded. Please wait a moment and try again.", 429)
            elif response.status_code != 200:
                logger.error(f"LLM Error {response.status_code}: {response.text}")
                raise LLMError(f"LLM API failed with code {response.status_code}", response.status_code)

            data = response.json()
            candidates = data.get("candidates", [])
            if not candidates:
                raise LLMError("No candidates returned from LLM model.", 500)

            parts = candidates[0].get("content", {}).get("parts", [])
            full_text = " ".join([p.get("text", "") for p in parts])

            logger.info(f"Raw LLM response text length: {len(full_text)}")
            logger.info(f"Raw LLM response text: {full_text}")
            clean_objects = parse_pokemon_objects(full_text)

            if clean_objects and len(clean_objects) > 0:
                # Sort items by confidence score descending, then slice down to target_count
                clean_objects.sort(key=lambda x: x.get("confidence_score", 0), reverse=True)
                top_matching_objects = clean_objects[:target_count]

                logger.info(f"Successfully extracted and sorted {len(top_matching_objects)} top Pokémon objects.")
                return top_matching_objects
            else:
                raise LLMError("Failed to parse clean Pokémon objects from response.", 500)

    except httpx.ReadTimeout:
        logger.error("LLM Request timed out while waiting for the LLM to finish writing the JSON.")
        raise LLMError("The LLM took too long to generate the Pokemon list. Please try a simpler prompt.", 504)
    except LLMError as e:
        raise e
    except Exception as e:
        logger.exception(f"Unexpected error calling Online LLM: {e}")
        error_msg = str(e) if str(e) else type(e).__name__
        raise LLMError(f"Unexpected error calling Online LLM: {error_msg}", 500)
