import { BASE_URL } from '../helpers/config.js';
import customClient from '../helpers/httpClient.js';

const fetchPokemon = async (id) => {
    const pokemon = await customClient.get(`${BASE_URL}/pokemon/${id}`);
    return pokemon;
}

export {
    fetchPokemon
}