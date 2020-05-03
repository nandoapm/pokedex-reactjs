import React, { useRef } from 'react';
import { useDrop } from 'react-dnd'

import * as PokedexActions from '../../store/actions/pokedex';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Pokemon from '../Pokemon';

import './styles.scss'
import pokeball from '../../assets/pokeball.svg' 

const Pokedex = ({dragInPokemon, pokemon}) => {

  const ref = useRef();

  const [, dropRef] = useDrop({
    accept: 'POKEMON',
    drop(item) {
      dragInPokemon({...item.pokemon, pokedex: true});
    }
  });

  dropRef(ref);

  return (
    <div className="container-pokedex" ref={ref}>
        <header className="titulo">
          <img src={pokeball} alt="" />
        </header>
        <div className="pokedex">
          { pokemon.length === 0 && <center>Arraste aqui para adicionar ou arraste fora para remover.</center> }
          { pokemon.map(pokemon => <Pokemon key={pokemon.id} pokemon={pokemon} shiny={false} detailed={false} /> )}
        </div>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(PokedexActions, dispatch);

const mapStateToProps = state => ({
  pokemon: state.pokedex.pokedex.sort((a, b) => a.id - b.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex)
