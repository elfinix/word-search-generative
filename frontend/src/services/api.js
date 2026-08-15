/**
 * Robust API Service Layer for PokéSearch Backend API.
 * Connects to FastAPI, PokeAPI, Gemma 4 31B LLM, and Supabase.
 */

const API_BASE = '/api';
const DEFAULT_TIMEOUT_MS = 12000;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.detail || `HTTP Error ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please try again.', 408);
    }
    throw error;
  }
}

export const fetchPuzzleApi = async (difficulty = 'medium') => {
  return fetchWithTimeout(`${API_BASE}/puzzles/generate?difficulty=${difficulty}`, {
    method: 'GET'
  });
};

export const generateCustomListApi = async (prompt, difficulty = 'medium') => {
  return fetchWithTimeout(`${API_BASE}/puzzles/generate-list?prompt=${encodeURIComponent(prompt)}&difficulty=${difficulty}`, {
    method: 'POST'
  }, 90000); // 90s for LLM processing
};

export const generatePuzzleFromListApi = async (pokemonList, difficulty = 'medium') => {
  return fetchWithTimeout(`${API_BASE}/puzzles/generate-from-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pokemon_list: pokemonList,
      difficulty: difficulty
    })
  }, 10000); // 10s for local generation
};

export const verifyWordApi = async (payload) => {
  return fetchWithTimeout(`${API_BASE}/puzzles/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
};

export const submitScoreApi = async (scoreData) => {
  return fetchWithTimeout(`${API_BASE}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scoreData)
  });
};

export const fetchTopScoresApi = async (difficulty = 'medium', limit = 10) => {
  return fetchWithTimeout(`${API_BASE}/scores/top?difficulty=${difficulty}&limit=${limit}`);
};

export const fetchSummaryStatsApi = async () => {
  return fetchWithTimeout(`${API_BASE}/stats`);
};
