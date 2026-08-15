from app.main import app

# This file serves as the Vercel Serverless Function entrypoint.
# Placing it in the backend/ root directory ensures that Vercel properly:
# 1. Finds the backend/requirements.txt file
# 2. Resolves the 'app' module correctly for Python imports (e.g., from app.routes import ...)
