import sys
import os

# Add the backend directory to sys.path so 'from app...' imports work correctly in Vercel
backend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend')
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.main import app
# 2. Resolves the Python module paths correctly from the project root
