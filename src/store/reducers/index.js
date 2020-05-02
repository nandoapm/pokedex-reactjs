import { combineReducers } from 'redux';

import search from './search';
import pokemon from './pokemon';
import pokedex from './pokedex';

export default combineReducers({
    search,
    pokemon,
    pokedex
})