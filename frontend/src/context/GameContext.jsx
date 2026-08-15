import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  fetchPuzzleApi, 
  generateCustomListApi,
  generatePuzzleFromListApi,
  verifyWordApi, 
  submitScoreApi, 
  fetchTopScoresApi
} from '../services/api';
import { useTimer } from '../hooks/useTimer';
import { useToast } from '../hooks/useToast';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [activeTab, setActiveTab] = useState('landing');
  const [difficulty, setDifficulty] = useState('medium');
  const [puzzleData, setPuzzleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintCell, setHintCell] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Prompt Modal States
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [promptLoading, setPromptLoading] = useState(false);
  const [promptError, setPromptError] = useState(null);
  const [activePromptTopic, setActivePromptTopic] = useState(null);

  const { seconds: timerSeconds, startTimer, pauseTimer, resetTimer, formatTime } = useTimer();
  const { toast, showToast } = useToast();

  // Load Standard PokeAPI puzzle
  const loadPuzzle = useCallback(async (diff = difficulty) => {
    setLoading(true);
    setFoundWords([]);
    setHintsUsed(0);
    setHintCell(null);
    setShowVictory(false);
    setActivePromptTopic(null);
    resetTimer();

    try {
      const data = await fetchPuzzleApi(diff);
      setPuzzleData(data);
      startTimer();
      showToast(`Loaded ${diff.toUpperCase()} Pokémon puzzle!`, 'success');
    } catch (err) {
      console.error(err);
      showToast("Error connecting to backend API.", "error");
    } finally {
      setLoading(false);
    }
  }, [difficulty, resetTimer, startTimer, showToast]);

  // Load Custom LLM Gemma 4 31B puzzle
  const loadCustomPuzzle = useCallback(async (promptText, diff = difficulty) => {
    setPromptLoading(true);
    setPromptError(null);

    try {
      const listData = await generateCustomListApi(promptText, diff);
      const puzzle = await generatePuzzleFromListApi(listData.pokemon_list, diff);
      
      setPuzzleData(puzzle);
      setFoundWords([]);
      setHintsUsed(0);
      setHintCell(null);
      setShowVictory(false);
      setActivePromptTopic(promptText);
      resetTimer();
      startTimer();

      setShowPromptModal(false);
      showToast(`Generated custom round: "${promptText}"`, 'success');
    } catch (err) {
      console.error(err);
      const msg = err.message || "Failed to generate custom puzzle.";
      setPromptError(msg);
      showToast(msg, "error");
    } finally {
      setPromptLoading(false);
    }
  }, [difficulty, resetTimer, startTimer, showToast]);

  // Start game / Open Prompt Modal
  const startGame = useCallback(() => {
    setActiveTab('play');
    setShowPromptModal(true);
  }, []);

  // Handle word selection
  const handleWordSelect = useCallback((selectedWord, start, end) => {
    if (!puzzleData) return;

    const upperWord = selectedWord.toUpperCase();
    const reversedWord = upperWord.split('').reverse().join('');

    const targetMatch = puzzleData.target_words.find(
      (tw) => (tw.name === upperWord || tw.name === reversedWord) && !foundWords.includes(tw.name)
    );

    if (targetMatch) {
      const matchedName = targetMatch.name;
      const updatedFound = [...foundWords, matchedName];
      setFoundWords(updatedFound);
      showToast(`Found ${matchedName}! (+100 pts)`, 'success');

      verifyWordApi({
        word: matchedName,
        start_row: start.r,
        start_col: start.c,
        end_row: end.r,
        end_col: end.c
      }).catch(console.error);

      if (updatedFound.length === puzzleData.target_words.length) {
        pauseTimer();
        setTimeout(() => {
          setShowVictory(true);
        }, 500);
      }
    }
  }, [puzzleData, foundWords, showToast, pauseTimer]);

  // Trigger hint
  const handleUseHint = useCallback(() => {
    if (!puzzleData) return;
    const unfoundSolutions = puzzleData.placed_solutions.filter(
      (sol) => !foundWords.includes(sol.word)
    );

    if (unfoundSolutions.length === 0) return;

    const randomSol = unfoundSolutions[Math.floor(Math.random() * unfoundSolutions.length)];
    setHintCell({ r: randomSol.start_row, c: randomSol.start_col });
    setHintsUsed((prev) => prev + 1);
    showToast(`Hint: Check cell (${randomSol.start_row + 1}, ${randomSol.start_col + 1}) for ${randomSol.word[0]}...`, 'info');

    setTimeout(() => {
      setHintCell(null);
    }, 3000);
  }, [puzzleData, foundWords, showToast]);

  // Score calculation
  const calculateScore = useCallback(() => {
    const base = foundWords.length * 100;
    const diffBonus = difficulty === 'hard' ? 300 : difficulty === 'medium' ? 150 : 50;
    const timePenalty = Math.floor(timerSeconds / 3);
    const hintPenalty = hintsUsed * 30;
    return Math.max(50, base + diffBonus - timePenalty - hintPenalty);
  }, [foundWords.length, difficulty, timerSeconds, hintsUsed]);

  // Submit score to Supabase
  const handleSubmitScore = useCallback(async (playerName) => {
    const finalScore = calculateScore();
    try {
      await submitScoreApi({
        player_name: playerName,
        difficulty: difficulty,
        time_seconds: timerSeconds,
        score: finalScore
      });
      fetchLeaderboard();
    } catch (e) {
      console.error(e);
    }
  }, [calculateScore, difficulty, timerSeconds]);

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async () => {
    try {
      const data = await fetchTopScoresApi(difficulty);
      setLeaderboard(data);
    } catch (e) {
      console.error(e);
    }
  }, [difficulty]);

  return (
    <GameContext.Provider value={{
      activeTab,
      setActiveTab,
      difficulty,
      setDifficulty,
      puzzleData,
      loading,
      foundWords,
      timerSeconds,
      formatTime,
      hintsUsed,
      hintCell,
      showVictory,
      setShowVictory,
      leaderboard,
      showLeaderboard,
      setShowLeaderboard,
      showPromptModal,
      setShowPromptModal,
      promptLoading,
      promptError,
      activePromptTopic,
      toast,
      loadPuzzle,
      loadCustomPuzzle,
      startGame,
      handleWordSelect,
      handleUseHint,
      calculateScore,
      handleSubmitScore,
      fetchLeaderboard
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
