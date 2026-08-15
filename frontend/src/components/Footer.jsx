import React from 'react';
import { Gamepad2, Heart, ArrowUp } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Footer() {
  const { startGame } = useGame();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 1.5rem 2rem'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Gamepad2 size={18} />
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
            PokéSearch
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <a href="#about">About Game</a>
          <a href="#developer">Developer</a>
          <button onClick={startGame} style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>
            Play Now
          </button>
        </div>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}
          title="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '1.5rem auto 0',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <p>© {new Date().getFullYear()} PokéSearch Generative. Built with ReactJS, FastAPI & SQLite.</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Crafted with <Heart size={14} style={{ color: '#ef4444' }} /> for Pokémon Fans
        </p>
      </div>
    </footer>
  );
}
