const INITIAL_STATE = {
    home: 0,
    amountPage: 18,
    frontPage: 18,
    loading: true,
    pokemons: [],
};

export default function pokemon(state = INITIAL_STATE, action) {
    if(action.type === 'GET_POKEMON') {
        return {...state, pokemons: action.payload.pokemons, loading: false }
    }
    if(action.type === 'NEXT_PAGE') {
        return {...state, home: state.home + state.amountPage, frontPage: state.frontPage + state.amountPage }
    }
    if(action.type === 'BACK_PAGE') {
        return {...state, home: state.home - state.amountPage, frontPage: state.frontPage - state.amountPage }
    }
    if(action.type === 'UPDATE_PAGE') {
        return {...state, home: 0, frontPage: 18}
    }
    return state;
}