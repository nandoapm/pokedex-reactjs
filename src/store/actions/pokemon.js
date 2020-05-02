export function setPokemon(amount) {
  return { type: 'SET_POKEMON', payload: { amount } }
}

export function nextPage() { 
  return { type: 'NEXT_PAGE' } 
}

export function backPage() {
  return { type: 'BACK_PAGE' }
}

export function updatePage() {
   return { type: 'UPDATE_PAGE' }
}