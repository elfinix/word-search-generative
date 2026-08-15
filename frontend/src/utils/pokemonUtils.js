/**
 * Helper utilities for Pokémon Type Badges and Styling.
 */

const VALID_TYPES = new Set([
  'electric', 'fire', 'water', 'grass', 'psychic',
  'ghost', 'dragon', 'fairy', 'normal', 'ground', 'rock'
]);

/**
 * Returns CSS class for elemental type pill.
 */
export function getPokemonTypeClass(type) {
  if (!type) return 'type-normal';
  const lower = type.toLowerCase();
  return VALID_TYPES.has(lower) ? `type-${lower}` : 'type-normal';
}
