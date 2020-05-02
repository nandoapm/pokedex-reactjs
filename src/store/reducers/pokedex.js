const INITIAL_STATE = {
    pokedex: [],
};

export default function pokemon(state = INITIAL_STATE, action) {
    if(action.type === 'DRAG_IN_POKEMON') {
        if(state.pokedex.filter(p => p.id === action.pokemon.id).length === 0) {
            return {...state, pokedex: [...state.pokedex, action.pokemon] }
        }
    }
    if(action.type === 'DRAG_OUT_POKEMON') {
        return {...state, pokedex: state.pokedex.filter(p => p.id !== action.pokemon.id) }
    }
    return state;
}