import pytest
import os
from dotenv import load_dotenv

# Load real .env FIRST so live credentials take precedence over dummy fallbacks
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"))

# Set fallback dummy values only if not already loaded from .env
os.environ.setdefault("GEMINI_API_KEY", "dummy_key")
os.environ.setdefault("SUPABASE_URL", "http://dummy-supabase.url")
os.environ.setdefault("SUPABASE_SERVICE_ROLE_KEY", "dummy-key")


@pytest.fixture
def anyio_backend():
    return 'asyncio'
