import React from 'react';
import { Trophy } from 'lucide-react';

export default function LeaderboardModal({ leaderboard, difficulty, onClose, formatTime }) {
  return (
    <div className="glass-panel" style={{
      padding: '1.5rem',
      marginBottom: '2rem',
      border: '1px solid var(--accent-primary)',
      animation: 'floatAnim 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Trophy size={20} style={{ color: '#f59e0b' }} /> Top Trainers ({difficulty.toUpperCase()})
        </h3>
        <button onClick={onClose} style={{ color: 'var(--text-muted)', fontWeight: '700' }}>
          Close
        </button>
      </div>

      {leaderboard.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          No high scores recorded yet for this difficulty!
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {leaderboard.map((item, idx) => (
            <div key={item.id} style={{
              display: 'flex',
              justify: 'space-between',
              padding: '0.6rem 1rem',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <span>#{idx + 1} {item.player_name}</span>
              <span>{item.score} pts ({formatTime(item.time_seconds)})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
