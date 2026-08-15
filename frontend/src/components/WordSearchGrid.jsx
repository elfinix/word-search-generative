import React, { useState, memo } from 'react';
import { getSelectedLineCells, getFoundWordColor } from '../utils/gridUtils';

function WordSearchGrid({ 
  grid, 
  gridSize, 
  foundWords, 
  solutions, 
  onWordSelect, 
  hintCell 
}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [currentCell, setCurrentCell] = useState(null);

  const selectedLine = getSelectedLineCells(startCell, currentCell);

  const handleMouseDown = (r, c) => {
    setIsSelecting(true);
    setStartCell({ r, c });
    setCurrentCell({ r, c });
  };

  const handleMouseEnter = (r, c) => {
    if (isSelecting) {
      setCurrentCell({ r, c });
    }
  };

  const handleMouseUp = () => {
    if (isSelecting && startCell && currentCell) {
      const line = getSelectedLineCells(startCell, currentCell);
      if (line.length > 1) {
        const selectedChars = line.map(cell => grid[cell.r][cell.c]).join('');
        onWordSelect(selectedChars, startCell, currentCell);
      }
    }
    setIsSelecting(false);
    setStartCell(null);
    setCurrentCell(null);
  };

  const isCellInActiveSelection = (r, c) => {
    return selectedLine.some(cell => cell.r === r && cell.c === c);
  };

  return (
    <div 
      onMouseLeave={handleMouseUp}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '6px',
        padding: '1.2rem',
        background: 'var(--grid-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        userSelect: 'none',
        touchAction: 'none',
        maxWidth: '650px',
        margin: '0 auto'
      }}
    >
      {grid.map((row, r) => 
        row.map((letter, c) => {
          const foundColor = getFoundWordColor(r, c, solutions, foundWords);
          const isSelected = isCellInActiveSelection(r, c);
          const isHint = hintCell && hintCell.r === r && hintCell.c === c;

          return (
            <div
              key={`${r}-${c}`}
              onMouseDown={() => handleMouseDown(r, c)}
              onMouseEnter={() => handleMouseEnter(r, c)}
              onMouseUp={handleMouseUp}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-sm)',
                background: isSelected 
                  ? 'var(--accent-primary)' 
                  : foundColor 
                    ? foundColor 
                    : isHint 
                      ? '#f59e0b' 
                      : 'var(--grid-cell-bg)',
                color: (isSelected || foundColor || isHint) ? '#ffffff' : 'var(--grid-cell-text)',
                fontWeight: '800',
                fontSize: gridSize > 12 ? '0.95rem' : '1.15rem',
                fontFamily: 'var(--font-heading)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isSelected 
                  ? '0 0 10px var(--accent-glow)' 
                  : isHint 
                    ? '0 0 16px #f59e0b' 
                    : 'none',
                transform: isSelected || isHint ? 'scale(1.06)' : 'scale(1)',
                transition: 'all 0.15s ease',
                border: '1px solid var(--border-color)'
              }}
            >
              {letter}
            </div>
          );
        })
      )}
    </div>
  );
}

export default memo(WordSearchGrid);
