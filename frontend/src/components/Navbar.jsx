import React from 'react';
import { Sun, Moon, Gamepad2, Sparkles, HelpCircle, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { activeTab, setActiveTab, startGame } = useGame();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
      padding: '0.8rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('landing')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 12px var(--accent-glow)'
        }}>
          <Gamepad2 size={22} />
        </div>
        <div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            PokéSearch
          </span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            color: 'var(--accent-primary)',
            marginTop: '-4px'
          }}>
            Generative Word Matrix
          </span>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            fontWeight: activeTab === 'landing' ? '700' : '500',
            color: activeTab === 'landing' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            transition: 'color var(--transition-fast)'
          }}
        >
          <Sparkles size={16} /> Home
        </button>

        <a 
          href="#about"
          onClick={() => { if(activeTab !== 'landing') setActiveTab('landing'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            transition: 'color var(--transition-fast)'
          }}
        >
          <HelpCircle size={16} /> About
        </a>

        <a 
          href="#developer"
          onClick={() => { if(activeTab !== 'landing') setActiveTab('landing'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            color: 'var(--text-secondary)',
            transition: 'color var(--transition-fast)'
          }}
        >
          <Code2 size={16} /> Developer
        </a>

        {/* Play CTA Button */}
        <button
          onClick={startGame}
          style={{
            background: activeTab === 'play' 
              ? 'var(--accent-primary)'
              : 'linear-gradient(135deg, #3b82f6, #6366f1)',
            color: '#ffffff',
            padding: '0.45rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            fontWeight: '700',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 14px var(--accent-glow)',
            transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
          }}
        >
          <Gamepad2 size={16} /> Play Game
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            transition: 'all var(--transition-fast)'
          }}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: '#f59e0b' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
        </button>
      </div>
    </nav>
  );
}
