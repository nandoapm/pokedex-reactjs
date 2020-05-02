export function filterPokemon(filter) {
  return { type: 'FILTER_POKEMON', filter }
}

export function showPokemon(show) {
  return { type: 'SHOW_POKEMON', show }
}

