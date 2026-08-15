import React from 'react';
import { Code2, Github, Linkedin, Mail, ExternalLink, Terminal, ShieldAlert } from 'lucide-react';

export default function DeveloperSection() {
  return (
    <section id="developer" style={{
      padding: '4.5rem 1.5rem',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: 'var(--accent-primary)',
            marginBottom: '0.8rem'
          }}>
            <Code2 size={14} /> Full-Stack Creator
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800' }}>
            About the Developer
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            Crafting elegant web experiences with clean architecture and modern UX patterns.
          </p>
        </div>

        {/* Developer Profile Card */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Avatar & Badges */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1, #ec4899)',
              padding: '4px',
              margin: '0 auto 1.2rem',
              boxShadow: '0 8px 20px var(--accent-glow)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                fontSize: '2.5rem',
                fontWeight: '900'
              }}>
                <Terminal size={48} />
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.2rem' }}>
              Louis & Antigravity
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              Full-Stack Software Engineer
            </span>

            {/* Tech Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              justifyContent: 'center',
              marginTop: '1.2rem'
            }}>
              {['ReactJS', 'FastAPI', 'SQLite', 'Python', 'Node', 'Vanilla CSS'].map((tech, i) => (
                <span 
                  key={i}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bio & Details */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.8rem', color: 'var(--accent-primary)' }}>
              Project Motivation & Engineering Focus
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '1.2rem' }}>
              PokéSearch was built to demonstrate clean full-stack separation between algorithmic Python matrix generation and responsive React client states. Designed with WCAG AA contrast, custom glassmorphic panels, and smooth micro-animations.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}
              >
                <Github size={16} /> GitHub Profile <ExternalLink size={12} />
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}
              >
                <Linkedin size={16} /> LinkedIn <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
