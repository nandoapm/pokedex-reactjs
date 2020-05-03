import React, { useRef } from 'react';
import { useDrag } from 'react-dnd'

import * as SearchActions from '../../store/actions/search';
import * as PokemonActions from '../../store/actions/pokemon';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss'

const Pokemon = ({ filter, show, detailed, filterPokemon, updatePage, pokemon }) => {

  const ref = useRef();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'POKEMON', pokemon: pokemon },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function detailPokemon(name) {
    filterPokemon(name + " ");
    updatePage();
  }

  function searchType(type) {
    if(isKeyDown('Control') && isKeyDown('Alt')) {
      filterPokemon(filter.length === 0 ? type.name + " " : filter += "& " + type.name + " ");
    } else if(isKeyDown('Control')) {
      filterPokemon(filter.length === 0 ? type.name + " " : filter += type.name + " ");
    } else {
      filterPokemon(type.name + " ");
    }
    updatePage();
  }

  let isKeyDown = (() => {
      let state = {};

      window.addEventListener('keyup', (e) => state[e.key] = false);
      window.addEventListener('keydown', (e) => state[e.key] = true);

      return (key) => (state.hasOwnProperty(key) && state[key]) || false;
  })();

  dragRef(ref);

  return (
    <div className="container-pokemon" ref={ref} isDragging={isDragging} detailed={detailed} >
      <div className="" onClick={() => { detailPokemon(pokemon.name) }}>
        
        <div className="sprites">
            { pokemon.sprites.front_default && <img src={show ? pokemon.sprites.front_show ? pokemon.sprites.front_show : pokemon.sprites.front_default : pokemon.sprites.front_default} alt="" /> }
        </div>

        <header className="name">
            <span>{pokemon.name}</span>
        </header>
      </div>

      <div className="types">
          { pokemon.types.map(({type}, index) => <span key={index} onClick={() => { searchType(type) }} className={type.name}>{type.name} </span>) }
      </div>

      {detailed && 
        <div>
          <h1>
            <span>Peso: </span>{pokemon.weight}kg | <span>Altura: </span>{pokemon.height}cm
          </h1>

          <h1>Estatísticas:</h1>

          <ul>
            {pokemon.stats.map((stat, index) => 
              <li key={index}>
                <span style={{textTransform: 'capitalize'}}>{stat.stat.name.replace('-', ' ')}: </span>{stat.base_stat}
              </li>
            )}
          </ul>
          
          <h1>Habilidades:</h1>

          <ul>
            {pokemon.abilities.map((ability, index) => 
              <li key={index}>
                <span style={{textTransform: 'capitalize'}}>{ability.ability.name.replace('-', ' ')} <span>{ability.is_hidden ? '(Hidden)' : ''}</span> </span>
              </li>
            )}
          
          </ul>
        </div>
        }
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, SearchActions, PokemonActions), dispatch);

const mapStateToProps = state => ({
  show: state.search.show,
  filter: state.search.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
