import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Clock, Sparkles, RotateCcw, Home, Send, Check } from 'lucide-react';

export default function VictoryModal({ 
  stats, 
  onPlayAgain, 
  onGoHome, 
  onSubmitScore 
}) {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti shower!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    onSubmitScore(playerName.trim());
    setSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(11, 19, 41, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '2.2rem',
        textAlign: 'center',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        animation: 'floatAnim 3s ease-in-out infinite'
      }}>
        {/* Trophy Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #eab308)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.2rem',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)'
        }}>
          <Trophy size={40} />
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.4rem' }}>
          Puzzle Completed!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.8rem' }}>
          Awesome job! You found all Pokémon hidden in the grid.
        </p>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.8rem'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <Clock size={20} style={{ color: 'var(--accent-primary)', marginBottom: '4px' }} />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>TIME TAKEN</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>{formatTime(stats.timeSeconds)}</div>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <Sparkles size={20} style={{ color: '#22c55e', marginBottom: '4px' }} />
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>FINAL SCORE</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{stats.score} PTS</div>
          </div>
        </div>

        {/* Leaderboard Submission Form */}
        {!submitted ? (
          <form onSubmit={handleScoreSubmit} style={{ marginBottom: '1.8rem' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Enter Trainer Name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--accent-primary)',
                  color: '#ffffff',
                  padding: '0.7rem 1.2rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Send size={16} /> Save
              </button>
            </div>
          </form>
        ) : (
          <div style={{
            padding: '0.6rem',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid #22c55e',
            color: '#22c55e',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            fontWeight: '700',
            marginBottom: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <Check size={18} /> High score submitted to leaderboard!
          </div>
        )}

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
          <button
            onClick={onPlayAgain}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#ffffff',
              padding: '0.85rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '800',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px var(--accent-glow)'
            }}
          >
            <RotateCcw size={18} /> Play Next Puzzle
          </button>

          <button
            onClick={onGoHome}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              padding: '0.85rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontWeight: '700',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Home size={18} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
