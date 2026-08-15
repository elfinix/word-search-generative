"""
Centralized Configuration Settings for PokéSearch Backend.
"""
from typing import Dict, Any, List, Tuple

# Database Configuration
DATABASE_URL: str = "sqlite:///./word_search.db"

# Matrix Directions for Word Placement (Row Delta, Col Delta, Name)
DIRECTION_EAST: Tuple[int, int, str] = (0, 1, "E")
DIRECTION_WEST: Tuple[int, int, str] = (0, -1, "W")
DIRECTION_SOUTH: Tuple[int, int, str] = (1, 0, "S")
DIRECTION_NORTH: Tuple[int, int, str] = (-1, 0, "N")
DIRECTION_SOUTH_EAST: Tuple[int, int, str] = (1, 1, "SE")
DIRECTION_NORTH_WEST: Tuple[int, int, str] = (-1, -1, "NW")
DIRECTION_SOUTH_WEST: Tuple[int, int, str] = (1, -1, "SW")
DIRECTION_NORTH_EAST: Tuple[int, int, str] = (-1, 1, "NE")

ALL_DIRECTIONS: List[Tuple[int, int, str]] = [
    DIRECTION_EAST,
    DIRECTION_WEST,
    DIRECTION_SOUTH,
    DIRECTION_NORTH,
    DIRECTION_SOUTH_EAST,
    DIRECTION_NORTH_WEST,
    DIRECTION_SOUTH_WEST,
    DIRECTION_NORTH_EAST,
]

# Difficulty Tiers & Grid Sizing
DIFFICULTY_SETTINGS: Dict[str, Dict[str, Any]] = {
    "easy": {
        "size": 10,
        "word_count": 6,
        "directions": [DIRECTION_EAST, DIRECTION_SOUTH],
    },
    "medium": {
        "size": 12,
        "word_count": 8,
        "directions": [
            DIRECTION_EAST,
            DIRECTION_SOUTH,
            DIRECTION_SOUTH_EAST,
            DIRECTION_WEST,
        ],
    },
    "hard": {
        "size": 15,
        "word_count": 12,
        "directions": ALL_DIRECTIONS,
    },
}

MAX_PLACEMENT_ATTEMPTS: int = 100
DEFAULT_DIFFICULTY: str = "medium"
