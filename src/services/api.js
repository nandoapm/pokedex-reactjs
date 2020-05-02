import axios from 'axios';

const apiService = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

const api = {
    async getPokemon(id, evolution = false) {
        const data = await apiService.get('pokemon/' + id).catch(() => {
            return false;
        });
        if(evolution) {
            if(data) {
                data.data.species = await this.getSpecies(data.data.species.url);
                data.data.species.evolution_chain = await this.getEvolutions(data.data.species.evolution_chain.url);
            }
        }
        return data;
    },

    async getPokemonList(limit) {
        let {data} = await apiService.get('pokemon/?limit=' + limit);
        const dataDetails = await this.getDetails(data);
        const details = await Promise.all(dataDetails);
        data.results = details;
        return data;
    },

    async getPokemonListType(type) {
        let {data} = await apiService.get('type/' + type);
        data.results = data.pokemon.map(item => {
            return item.pokemon
        })
        const dataDetails = await this.getDetails(data);
        const details = await Promise.all(dataDetails);
        data.pokemon = details;
        return data.pokemon;
    },

    async getEvolutions(url) {
        const {data} = await axios.get(url);
        return data;
    },

    async getSpecies(url) {
        const {data} = await axios.get(url);
        return data;
    },

    async getDetails(data) {
        return data.results.map(async (pokemon) => {
            let {data} = await this.getPokemon(pokemon.name);
            return data;
        });
    },

    async getResource(url) {
        let {data} = await axios.get(url);
        const dataDetails = await this.getDetails(data);
        const details = await Promise.all(dataDetails);
        data.results = details;
        return data;
    },
}

export default api
