import React from 'react';
import { Sparkles, Moon, Lightbulb, Trophy, Layers } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Moon size={22} style={{ color: '#6366f1' }} />,
      title: 'Midnight Blue & Light Theme',
      desc: 'Seamlessly toggle between Midnight Blue dark mode and crisp high-contrast light mode with preserved user preferences.'
    },
    {
      icon: <Lightbulb size={22} style={{ color: '#f59e0b' }} />,
      title: 'Interactive Hint System',
      desc: 'Stuck on a tricky diagonal word? Click the Hint button to briefly highlight the starting cell of an unfound Pokémon.'
    },
    {
      icon: <Trophy size={22} style={{ color: '#22c55e' }} />,
      title: 'Global High Scores',
      desc: 'Fastest solvers get ranked on the SQLite leaderboard with time-to-solve tracking and difficulty tiers.'
    },
    {
      icon: <Layers size={22} style={{ color: '#06b6d4' }} />,
      title: 'Extensible Architecture',
      desc: 'Built with clean backend service separation (FastAPI) and frontend component isolation (ReactJS) for rapid feature expansion.'
    }
  ];

  return (
    <section style={{ padding: '4.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.3rem 0.9rem',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--accent-primary)',
          marginBottom: '0.8rem'
        }}>
          <Sparkles size={14} /> Built For Gamers
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
          Game Features
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.8rem'
      }}>
        {features.map((item, idx) => (
          <div 
            key={idx}
            style={{
              background: 'var(--bg-card)',
              padding: '1.6rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
            }}
          >
            <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {item.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
