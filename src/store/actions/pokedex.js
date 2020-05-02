export function dragInPokemon(pokemon) {
  return { type: 'DRAG_IN_POKEMON', pokemon }
}

export function dragOutPokemon(pokemon) { 
  return { type: 'DRAG_OUT_POKEMON', pokemon }
}