const INITIAL_STATE = {
    filter: '',
    show: false,
    detailed: false,
};

export default function search(state = INITIAL_STATE, action) {
    if(action.type === 'FILTER_POKEMON') {
        return {...state, filter: action.filter }
    }
    
    if(action.type === 'SHOW_POKEMON') {
        return {...state, show: action.show }
    }
    
    return state;
}