import React from 'react';
import { Gamepad2, Zap, Trophy, Flame } from 'lucide-react';

export default function HeroSection({ onPlayClick }) {
  const previewLetters = [
    ['P', 'I', 'K', 'A', 'C', 'H', 'U'],
    ['C', 'H', 'A', 'R', 'I', 'Z', 'A'],
    ['M', 'E', 'W', 'T', 'W', 'O', 'R'],
    ['B', 'U', 'L', 'B', 'A', 'S', 'D'],
    ['G', 'E', 'N', 'G', 'A', 'R', 'X']
  ];

  return (
    <section style={{
      padding: '4.5rem 1.5rem 3.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '3rem',
      alignItems: 'center'
    }}>
      {/* Hero Left Content */}
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--accent-primary)',
          marginBottom: '1.2rem'
        }}>
          <Zap size={14} style={{ color: '#f59e0b' }} />
          <span>Generative Word Search — Topic: Pokémon Edition</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '1.2rem',
          color: 'var(--text-primary)'
        }}>
          Find Every <span style={{
            background: 'linear-gradient(135deg, #3b82f6, #818cf8, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Pokémon</span> Hidden in the Grid!
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '2rem',
          maxWidth: '540px'
        }}>
          Challenge your eyes and memory! Powered by FastAPI & SQLite, every game generates a unique, algorithmically crafted word search matrix with full light & dark mode support.
        </p>

        {/* CTA Button */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={onPlayClick}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: '#ffffff',
              padding: '0.95rem 2rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: '800',
              fontSize: '1.05rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: '0 8px 24px var(--accent-glow)',
              transition: 'transform var(--transition-fast)'
            }}
          >
            <Gamepad2 size={22} /> Play Game Now
          </button>

          <a
            href="#about"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              padding: '0.95rem 1.6rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontWeight: '700',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Learn How It Works
          </a>
        </div>

        {/* Feature Badges */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Flame size={16} style={{ color: '#ef4444' }} /> Infinite Generation
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Trophy size={16} style={{ color: '#f59e0b' }} /> Live Leaderboards
          </div>
        </div>
      </div>

      {/* Hero Right Visual Matrix Card */}
      <div className="float-effect" style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '0.8rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-primary)' }}>
            POKÉ-MATRIX DEMO
          </span>
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 8px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.15)',
            color: 'var(--accent-primary)',
            fontWeight: '700'
          }}>
            DIFFICULTY: MEDIUM
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px'
        }}>
          {previewLetters.map((row, rIdx) => 
            row.map((char, cIdx) => {
              const isFound = rIdx === 0; // Highlight PIKACHU row
              return (
                <div 
                  key={`${rIdx}-${cIdx}`}
                  style={{
                    aspectRatio: '1',
                    borderRadius: '8px',
                    background: isFound ? 'var(--accent-primary)' : 'var(--grid-cell-bg)',
                    color: isFound ? '#ffffff' : 'var(--text-primary)',
                    fontWeight: '800',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isFound ? '0 0 12px var(--accent-glow)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {char}
                </div>
              );
            })
          )}
        </div>

        <div style={{
          marginTop: '1.2rem',
          display: 'flex',
          justify: 'space-between',
          fontSize: '0.85rem',
          fontWeight: '600',
          color: 'var(--text-secondary)'
        }}>
          <span>Found: <strong style={{ color: '#22c55e' }}>1 / 5</strong></span>
          <span>Topic: <strong>Pokémon</strong></span>
        </div>
      </div>
    </section>
  );
}
