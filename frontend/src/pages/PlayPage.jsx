import React from 'react';
import WordSearchGrid from '../components/WordSearchGrid';
import WordList from '../components/WordList';
import VictoryModal from '../components/VictoryModal';
import LeaderboardModal from '../components/LeaderboardModal';
import PromptModal from '../components/PromptModal';
import { useGame } from '../context/GameContext';
import { Clock, Sparkles, Lightbulb, RotateCcw, Trophy, Wand2 } from 'lucide-react';

export default function PlayPage() {
  const {
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
    loadPuzzle,
    loadCustomPuzzle,
    handleWordSelect,
    handleUseHint,
    calculateScore,
    handleSubmitScore,
    fetchLeaderboard,
    setActiveTab
  } = useGame();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Active Custom Topic Banner */}
      {activePromptTopic && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 1.2rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid var(--accent-secondary)',
          color: 'var(--accent-secondary)',
          fontSize: '0.88rem',
          fontWeight: '700',
          marginBottom: '1.2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wand2 size={16} /> Active AI Topic: "{activePromptTopic}"
          </div>
          <button 
            onClick={() => setShowPromptModal(true)}
            style={{ color: 'var(--text-primary)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Change Prompt
          </button>
        </div>
      )}

      {/* Controls Bar Header */}
      <div className="glass-panel" style={{
        padding: '1.2rem 1.8rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.2rem'
      }}>
        {/* Difficulty Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            DIFFICULTY:
          </span>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              if (activePromptTopic) {
                loadCustomPuzzle(activePromptTopic, e.target.value);
              } else {
                loadPuzzle(e.target.value);
              }
            }}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="easy">Easy (10x10)</option>
            <option value="medium">Medium (12x12)</option>
            <option value="hard">Hard (15x15)</option>
          </select>
        </div>

        {/* Timer & Score Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}>
            <Clock size={18} style={{ color: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '1.1rem' }}>{formatTime(timerSeconds)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700' }}>
            <Sparkles size={18} style={{ color: '#f59e0b' }} />
            <span>Score: {calculateScore()}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={() => setShowPromptModal(true)}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#ffffff',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Wand2 size={16} /> AI Prompt
          </button>

          <button
            onClick={handleUseHint}
            disabled={!puzzleData || foundWords.length === puzzleData.target_words.length}
            style={{
              background: 'var(--bg-secondary)',
              color: '#f59e0b',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
            title="Highlight a starting letter"
          >
            <Lightbulb size={16} /> Hint ({hintsUsed})
          </button>

          <button
            onClick={() => {
              if (activePromptTopic) {
                loadCustomPuzzle(activePromptTopic, difficulty);
              } else {
                loadPuzzle(difficulty);
              }
            }}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RotateCcw size={16} /> New Game
          </button>

          <button
            onClick={() => {
              fetchLeaderboard();
              setShowLeaderboard(!showLeaderboard);
            }}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Trophy size={16} style={{ color: '#f59e0b' }} /> Leaderboard
          </button>
        </div>
      </div>

      {/* Prompt Modal */}
      <PromptModal 
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        onSubmitPrompt={(promptText) => loadCustomPuzzle(promptText, difficulty)}
        isLoading={promptLoading}
        errorMessage={promptError}
      />

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal 
          leaderboard={leaderboard} 
          difficulty={difficulty} 
          onClose={() => setShowLeaderboard(false)} 
          formatTime={formatTime} 
        />
      )}

      {/* Game Grid and Target List Workspace */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div className="float-effect" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
            Generating Pokémon Word Matrix...
          </div>
        </div>
      ) : puzzleData ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          <div>
            <WordSearchGrid 
              grid={puzzleData.grid}
              gridSize={puzzleData.grid_size}
              foundWords={foundWords}
              solutions={puzzleData.placed_solutions}
              onWordSelect={handleWordSelect}
              hintCell={hintCell}
            />
          </div>

          <div>
            <WordList 
              targetWords={puzzleData.target_words}
              foundWords={foundWords}
            />
          </div>
        </div>
      ) : null}

      {/* Victory Celebration Modal */}
      {showVictory && (
        <VictoryModal 
          stats={{
            timeSeconds: timerSeconds,
            score: calculateScore(),
            difficulty: difficulty
          }}
          onPlayAgain={() => {
            if (activePromptTopic) {
              loadCustomPuzzle(activePromptTopic, difficulty);
            } else {
              loadPuzzle(difficulty);
            }
          }}
          onGoHome={() => {
            setShowVictory(false);
            setActiveTab('landing');
          }}
          onSubmitScore={handleSubmitScore}
        />
      )}
    </div>
  );
}
