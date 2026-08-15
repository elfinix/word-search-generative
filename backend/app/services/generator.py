"""
Word Search Matrix Generation Engine.
Implements 8-directional backtracking placement with overlap validation.
"""
import random
import string
import uuid
from typing import List, Dict, Any, Tuple
from app.config import DIFFICULTY_SETTINGS, DEFAULT_DIFFICULTY, MAX_PLACEMENT_ATTEMPTS


class WordSearchGenerator:
    """Algorithmic word search matrix generator."""

    @staticmethod
    def _sanitize_word(name: str) -> str:
        """Strip non-alphabetic characters and convert to uppercase."""
        return name.upper().replace(" ", "").replace("-", "")

    @classmethod
    def can_place_word(
        cls,
        grid: List[List[str]],
        word: str,
        row: int,
        col: int,
        d_row: int,
        d_col: int,
        size: int,
    ) -> bool:
        """Validate if a word can be placed without boundary or letter conflicts."""
        word_len = len(word)
        end_row = row + d_row * (word_len - 1)
        end_col = col + d_col * (word_len - 1)

        # Boundary check
        if not (0 <= end_row < size and 0 <= end_col < size):
            return False

        # Collision check along trajectory
        for i in range(word_len):
            r = row + d_row * i
            c = col + d_col * i
            cell_char = grid[r][c]
            if cell_char != "" and cell_char != word[i]:
                return False

        return True

    @classmethod
    def place_word(
        cls,
        grid: List[List[str]],
        word: str,
        row: int,
        col: int,
        d_row: int,
        d_col: int,
    ) -> None:
        """Place word characters onto the 2D grid matrix."""
        for i, char in enumerate(word):
            grid[row + d_row * i][col + d_col * i] = char

    @classmethod
    def generate_puzzle(
        cls, pokemon_pool: List[Any], difficulty: str = DEFAULT_DIFFICULTY
    ) -> Dict[str, Any]:
        """Generate a complete 2D word search puzzle."""
        diff_key = difficulty.lower()
        config = DIFFICULTY_SETTINGS.get(diff_key, DIFFICULTY_SETTINGS[DEFAULT_DIFFICULTY])
        size: int = config["size"]
        max_words: int = config["word_count"]
        allowed_directions: List[Tuple[int, int, str]] = config["directions"]

        # Filter candidate Pokémon that fit within the grid
        valid_pool = [
            p for p in pokemon_pool if len(cls._sanitize_word(p.name)) <= size
        ]

        if len(valid_pool) < max_words:
            selected_pokemon = valid_pool
        else:
            selected_pokemon = random.sample(valid_pool, max_words)

        grid: List[List[str]] = [["" for _ in range(size)] for _ in range(size)]
        placed_solutions: List[Dict[str, Any]] = []
        target_words: List[Dict[str, Any]] = []

        for poke in selected_pokemon:
            clean_name = cls._sanitize_word(poke.name)
            placed = False
            attempts = 0

            while not placed and attempts < MAX_PLACEMENT_ATTEMPTS:
                attempts += 1
                row = random.randint(0, size - 1)
                col = random.randint(0, size - 1)
                d_row, d_col, dir_name = random.choice(allowed_directions)

                if cls.can_place_word(grid, clean_name, row, col, d_row, d_col, size):
                    cls.place_word(grid, clean_name, row, col, d_row, d_col)
                    end_r = row + d_row * (len(clean_name) - 1)
                    end_c = col + d_col * (len(clean_name) - 1)

                    type_payload = {
                        "id": poke.id,
                        "name": poke.name.capitalize(),
                        "primary_type": poke.primary_type.capitalize(),
                        "secondary_type": (
                            poke.secondary_type.capitalize()
                            if poke.secondary_type
                            else None
                        ),
                        "confidence_score": getattr(poke, 'confidence_score', 100),
                    }

                    placed_solutions.append({
                        "word": clean_name,
                        "start_row": row,
                        "start_col": col,
                        "end_row": end_r,
                        "end_col": end_c,
                        "direction": dir_name,
                        "type_info": type_payload,
                    })

                    target_words.append({
                        "id": poke.id,
                        "name": clean_name,
                        "primary_type": poke.primary_type.capitalize(),
                        "secondary_type": (
                            poke.secondary_type.capitalize()
                            if poke.secondary_type
                            else None
                        ),
                        "confidence_score": getattr(poke, 'confidence_score', 100),
                    })

                    placed = True

        # Fill empty cells with random uppercase letters
        alphabet = string.ascii_uppercase
        for r in range(size):
            for c in range(size):
                if grid[r][c] == "":
                    grid[r][c] = random.choice(alphabet)

        return {
            "id": str(uuid.uuid4()),
            "difficulty": diff_key,
            "grid_size": size,
            "grid": grid,
            "target_words": target_words,
            "placed_solutions": placed_solutions,
        }
