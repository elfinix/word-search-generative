import React, { useState } from 'react';
import { Sparkles, Wand2, HelpCircle, X, Loader2, Compass } from 'lucide-react';

const PRESET_TOPICS = [
  { label: '🔥 Fire & Dragon Legends', prompt: 'Fire and Dragon type legendary Pokémon' },
  { label: '⭐ Generation 1 Starters', prompt: 'Original Kanto Generation 1 starter Pokémon and evolutions' },
  { label: '🌸 Cute Fairy & Normal Types', prompt: 'Cute Fairy and Normal type Pokémon' },
  { label: '⚡ Fast Electric & Steel Types', prompt: 'Fast Electric and Steel type Pokémon' },
  { label: '🌊 Water & Ice Aquatics', prompt: 'Water and Ice type aquatic Pokémon' }
];

export default function PromptModal({ isOpen, onClose, onSubmitPrompt, isLoading, errorMessage }) {
  const [promptText, setPromptText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promptText.trim()) return;
    onSubmitPrompt(promptText.trim());
  };

  const handleSelectPreset = (presetPrompt) => {
    setPromptText(presetPrompt);
    onSubmitPrompt(presetPrompt);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      background: 'rgba(11, 19, 41, 0.82)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '2.2rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6, #818cf8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <Wand2 size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '900' }}>
              Custom Topic Generator
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
              POWERED BY GENERATIVE AI
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.4rem' }}>
          Tell our AI what Pokémon to hide in your puzzle matrix! Type any category, generation, type combination, or characteristic.
        </p>

        {/* Prompt Input Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <textarea
              rows={3}
              placeholder="e.g. 'Strong Ghost and Dark type Pokémon' or 'Heavy Gen 3 Pokémon'..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'none'
              }}
            />

            {/* Error Message Display */}
            {errorMessage && (
              <div style={{
                color: '#ef4444',
                background: 'rgba(239, 68, 68, 0.12)',
                padding: '0.6rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !promptText.trim()}
              style={{
                background: isLoading 
                  ? 'var(--text-muted)' 
                  : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: '#ffffff',
                padding: '0.85rem 1.4rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '800',
                fontSize: '0.98rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px var(--accent-glow)'
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> AI Generating Puzzle...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Generate Custom Round
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preset Prompt Chips */}
        <div>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: 'var(--text-muted)',
            marginBottom: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Compass size={14} /> OR CHOOSE A POPULAR PRESET:
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PRESET_TOPICS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset.prompt)}
                disabled={isLoading}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
