/**
 * Pure Utility Functions for Grid Geometry and Word Trajectory Calculations.
 */

// Preset vibrant highlight colors for found words
export const FOUND_COLORS = [
  '#ef4444', '#f59e0b', '#10b981', '#06b6d4', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899',
  '#14b8a6', '#84cc16', '#f97316', '#a855f7'
];

/**
 * Calculates straight line sequence of cells between start and end coordinates.
 */
export function getSelectedLineCells(start, end) {
  if (!start || !end) return [];

  const dr = end.r - start.r;
  const dc = end.c - start.c;

  const absDr = Math.abs(dr);
  const absDc = Math.abs(dc);

  // Must be horizontal, vertical, or 45-degree diagonal
  if (dr !== 0 && dc !== 0 && absDr !== absDc) {
    return [start];
  }

  const steps = Math.max(absDr, absDc);
  if (steps === 0) return [start];

  const rStep = dr === 0 ? 0 : dr / steps;
  const cStep = dc === 0 ? 0 : dc / steps;

  const line = [];
  for (let i = 0; i <= steps; i++) {
    line.push({
      r: Math.round(start.r + rStep * i),
      c: Math.round(start.c + cStep * i)
    });
  }
  return line;
}

/**
 * Determines highlight color for a grid cell if it belongs to a found word solution.
 */
export function getFoundWordColor(r, c, solutions = [], foundWords = []) {
  for (let idx = 0; idx < solutions.length; idx++) {
    const sol = solutions[idx];
    if (foundWords.includes(sol.word)) {
      const line = getSelectedLineCells(
        { r: sol.start_row, c: sol.start_col },
        { r: sol.end_row, c: sol.end_col }
      );
      const inLine = line.some(cell => cell.r === r && cell.c === c);
      if (inLine) {
        return FOUND_COLORS[idx % FOUND_COLORS.length];
      }
    }
  }
  return null;
}
