import axios from 'axios'

const urlService = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

const api = {
    async getPokemon(id, evolution = false) {
        const data = await urlService.get('/pokemon/', + id)
            .catch(() => {
                return false
            })
            if(evolution) {
                console.log(data)
            }
    }
}

export default api