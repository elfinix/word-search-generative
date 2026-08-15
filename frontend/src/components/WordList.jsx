import React, { memo } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { getPokemonTypeClass } from '../utils/pokemonUtils';

function WordList({ targetWords, foundWords }) {
  const totalCount = targetWords.length;
  const foundCount = foundWords.length;
  const progressPercent = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Header & Progress */}
      <div style={{ marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>
            Target Pokémon
          </h3>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
            {foundCount} / {totalCount}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          height: '8px',
          borderRadius: '4px',
          background: 'var(--bg-secondary)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #3b82f6, #22c55e)',
            borderRadius: '4px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* Target Word Items */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '0.75rem',
        maxHeight: '380px',
        overflowY: 'auto',
        paddingRight: '4px'
      }}>
        {targetWords.map((wordObj) => {
          const isFound = foundWords.includes(wordObj.name);
          return (
            <div
              key={wordObj.id || wordObj.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                background: isFound ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-secondary)',
                border: isFound ? '1px solid #22c55e' : '1px solid var(--border-color)',
                transition: 'all 0.2s ease',
                opacity: isFound ? 0.75 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  textDecoration: isFound ? 'line-through' : 'none',
                  color: isFound ? '#22c55e' : 'var(--text-primary)'
                }}>
                  {wordObj.name}
                </span>
                {isFound ? (
                  <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
                ) : (
                  <Circle size={16} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>

              {/* Type Badges */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                <span className={`type-badge ${getPokemonTypeClass(wordObj.primary_type)}`}>
                  {wordObj.primary_type}
                </span>
                {wordObj.secondary_type && (
                  <span className={`type-badge ${getPokemonTypeClass(wordObj.secondary_type)}`}>
                    {wordObj.secondary_type}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(WordList);
