<div align="center">
  <h1>🔍 PokéSearch: Generative AI Word Search</h1>
  <p><strong>A dynamic, AI-powered Pokémon word search game built with React, FastAPI, Google Gemini, and Supabase.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </p>
</div>

---

## ✨ Overview

**PokéSearch** is not your standard static word search game. It leverages the power of **Google Gemini** to generate custom, on-the-fly puzzle categories based on any prompt you can imagine! Want a puzzle featuring only "Fire and Dragon legends"? Or "Cute pink Generation 1 Pokémon"? The LLM generates the targeted Pokémon list, and our custom Python engine builds a highly-dense 8-directional word matrix instantly.

## 🚀 Key Features

- **🧠 Generative AI Puzzles:** Enter any prompt and watch the Google Gemini LLM curate a custom list of Pokémon for your puzzle.
- **⚙️ Dynamic Matrix Generation:** A custom Python backend engine that generates dense 10x10 (Easy), 12x12 (Medium), or 15x15 (Hard) matrices with 8-directional word placement.
- **🏆 Global Leaderboards:** Compete for the fastest times globally, securely backed by a **Supabase** PostgreSQL database with strict Row Level Security (RLS).
- **💅 Premium UI/UX:** A stunning "Midnight Blue" glassmorphism interface built with React, featuring dynamic animations, interactive highlights, and a gorgeous responsive layout.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Context API, Custom Hooks, Vanilla CSS (Glassmorphism design system).
- **Backend:** Python 3.10+, FastAPI, Pydantic.
- **AI & Data Sources:** Google Gemini LLM API, PokéAPI.
- **Database:** Supabase (PostgreSQL).

## 📚 Documentation & Guides

To keep this README clean, detailed setup and deployment instructions have been moved to dedicated documentation files:

- **[🖥️ Local Development Guide](others/LOCAL.md)**: Instructions for spinning up the FastAPI server, React frontend, and managing your Python virtual environment.
- **[🚀 Vercel Deployment Guide](others/VERCEL_GUIDE.md)**: A complete walkthrough on how to deploy this monorepo to Vercel via Serverless Functions, including Supabase SQL table initialization.

## 🎮 How to Play

1. Click **Play Game** from the Hero Page.
2. Click the **AI Prompt** button (✨) and type a prompt (e.g., *"Heavy Gen 3 Pokémon"*), or use one of the popular presets.
3. Select your **Difficulty** (Easy, Medium, Hard).
4. Find all the Pokémon hidden in the matrix (horizontal, vertical, diagonal, and backwards).
5. Submit your time to the **Global Supabase Leaderboard**!

---

<div align="center">
  <i>Built with ❤️ for Pokémon fans and Generative AI enthusiasts.</i>
</div>
