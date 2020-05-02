import { takeEvery, put, call } from 'redux-saga/effects';

import ApiSevice from '../services/api'

function* setPokemon(action) {

    const response = yield call([ApiSevice, ApiSevice.getPokemonList], action.payload.amount );
    yield put({ type: "GET_POKEMON", payload: { pokemons: response.results } });
}
export default function* root() {
    yield takeEvery("SET_POKEMON", setPokemon);
}

/**
 * yield = produção
 * call(), executa uma função. Se essa função retornar uma Promise, ele irá pausar a Saga até a Promise ser resolvida
 * put(), despacha uma redux action
 * takeEvery(), irá retornar os valores de todas as operações recebidas
 */


