import React, { useRef, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd'
import ApiService from '../../services/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SearchActions from '../../store/actions/search';
import * as PokemonActions from '../../store/actions/pokemon';
import * as PokedexActions from '../../store/actions/pokedex';

import { TiArrowBack, TiArrowForward } from "react-icons/ti";

import Pokemon from '../Pokemon';

import './styles.scss'

const List = ({ loading,  home, frontPage, showPokemon, filterPokemon, setPokemon, filter, filteredPokemons, pokemons, backPage, nextPage, updatePage, dragOutPokemon }) => {

  const [evolutionList, setEvolutionList] = useState([]);
  const [details, setDetails] = useState(false);

  const ref = useRef();

  const [, dropRef] = useDrop({
    accept: 'POKEMON',
    drop(item) {
      console.log(item)
      if (item.pokemon.pokedex) {
        dragOutPokemon(item.pokemon);
      }
    }
  });

  dropRef(ref);

  const getAllPokemon = () => {
    setPokemon(64);
    setPokemon(964);
  }

  function frontList() {
    nextPage();
  }

  function backList() {
    backPage();
  }
  
  function handleChange(event) {
 
    let filtro = event.target.value.toLowerCase();

    if(event.target.value.toLowerCase().includes("details")) {
      setDetails(true);
    } else {
      setDetails(false);
    }

    if(event.target.value.toLowerCase().includes("shiny")) {
      showPokemon(true);
    } else {
      showPokemon(false);
    }

    if("details".includes(filtro)) {
      filtro = filtro.replace("details", "")
    }

    if("show".includes(filtro)) {
      filtro = filtro.replace("show", "")
    }

    filterPokemon(filtro);
    updatePage();
  }

  async function getAllEvolution(pokemon) {
    const pokemonWithEvolutions = await ApiService.getPokemon(pokemon.name, true);
    pokemon = pokemonWithEvolutions.data;
    console.log(pokemon);
    if(pokemon.species.evolution_chain.chain.species.name) {
      if(evolutionList.length) {
        if(pokemon.species.evolution_chain.chain.species.name !== evolutionList[0].data.name) {
          evolutionList.length = 0;
        }
      }
      if(!evolutionList.length) {
        let firstEvolution = await ApiService.getPokemon(pokemon.species.evolution_chain.chain.species.name);
        let newArray = evolutionList;
        newArray.push(firstEvolution);
        setEvolutionList(Array.from(newArray));

        if(pokemon.species.evolution_chain.chain.evolves_to.length > 0) {

          let hasNext = true;
          
          let evolves_to = pokemon.species.evolution_chain.chain.evolves_to;
          
          do {
            let evolution = await getNextEvolution(evolves_to);
  
            if(Object.keys(evolution.next).length) {
              evolves_to = evolution.next;
            } else {
              hasNext = false;
            }
            
          } while (hasNext);
        }
      }
    }
  }

  async function getNextEvolution(evolves_to) {
    let pokemon = {};
    let next = {};

    for(let i = 0; i < evolves_to.length; i++) {
      if(evolves_to[i].species.name) {
        pokemon = await ApiService.getPokemon(evolves_to[i].species.name);
        let newArray = evolutionList;
        newArray.push(pokemon);
        setEvolutionList(Array.from(newArray));
      }
    }

    if(evolves_to.length > 0) {
      if(evolves_to[0].evolves_to.length > 0) {
        next = evolves_to[0].evolves_to;
      } else {
        next = {};
      }
    } else {
      if(evolves_to.evolves_to.length > 0) {
        console.log(evolves_to.evolves_to)
        next = evolves_to.evolves_to;
        console.log(next)
      } else {
        next = {};
      }
    }
    
    return {
      pokemon,
      next
    }
  }

  useEffect(() => {
    if(pokemons.length === 0) {
      getAllPokemon();
    }
    if(filteredPokemons.length === 1) {
      getAllEvolution(filteredPokemons[0]);
    }
  });

  return (
    <div className="container-list" ref={ref}>
      {/** buscar */}
      <div className="search">
        <input value={filter} onChange={handleChange} placeholder="Buscar..." />
      </div>

      {/** lista */}
      <div className="list">
        {filteredPokemons.slice(home, frontPage).map((pokemon, index) => <Pokemon key={index} pokemon={pokemon} detailed={filteredPokemons.length === 1 || details} />  )}
      </div>

      {/** evolução */}
      { filteredPokemons.length === 1 &&
        <div className="evolution">
          {evolutionList.map((evolution, index) => <Pokemon key={index} pokemon={evolution.data} detailed={false} />)}
        </div>
      }

      {/** paginação */}
      <div className="pagination">
        {!(home === 0) && <button onClick={backList}><TiArrowBack size="60" color="#ff0000"></TiArrowBack> </button>}
        {!(filteredPokemons.slice(home, frontPage).length < 12) && <button onClick={frontList}><TiArrowForward size="60" color="#ff0000"></TiArrowForward></button>}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const {filter} = state.search;
  const {pokemons} = state.pokemon;

  return {
    filteredPokemons: pokemons.filter(
      p => filter.includes(p.name) || 
      p.name.includes(filter) || 
      (p.types.every(t => filter.includes(t.type.name)) && filter.split('&').length < 3) || 
      (p.types.some(t => filter.includes(t.type.name)) && !filter.includes('&'))
    ),
    loading: state.pokemon.loading,
    home: state.pokemon.home,
    frontPage: state.pokemon.frontPage,
    filter,
    pokemons
  }

}

const mapDispatchToProps = dispatch => 
  bindActionCreators(Object.assign({}, SearchActions, PokemonActions, PokedexActions), dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(List);