import { defineStore } from 'pinia';
import pokeApi from '@/api/pokeApi'
import { ref } from 'vue';

export const usePokemon = defineStore('usePokemon', () => {
    const allPokemons = ref([]);
    const pokemonDetail = ref({});
    const favoritesPokemons = ref([]);

    const obtainPokemons = async () => {
        try {
            const { data } = await pokeApi.get(`/pokemon`);
            allPokemons.value = data.results.map(pokemon => ({
                ...pokemon,
                favorite: false,
                details: {}
            }));
        } catch (error) {
            console.log('Error');
            allPokemons.value = [];
        } 
    }

    const obtainDetailPokemon = async (pokemon) => {
        try {
            pokemonDetail.value = {};
            const { data } = await pokeApi.get(`/pokemon/${pokemon.name}`);

            const found = allPokemons.value.find(p => p.name === pokemon.name);
            
            if (found) found.details = {...data};
            
            if (favoritesPokemons.value.find(fp => fp.name === pokemon.name)) {
                found.favorite = true;
            }
            
            pokemonDetail.value = {
                ...found
            };
        } catch (error) {
            console.log('Error');
        } 
    }

    const addFavoritePokemon = async (pokemon) => {
        
        const foundPokemon = allPokemons.value.find(ap => ap.name == pokemon.name);
        
        if (foundPokemon) foundPokemon.favorite = true;

        if (!favoritesPokemons.value.find(fp => fp.name === pokemon.name)) {
            favoritesPokemons.value.push({...pokemon});
        }
    }

    const removeFavoritePokemon = async (pokemon) => {
        
        const foundPokemon = allPokemons.value.find(ap => ap.name == pokemon.name);
        if (foundPokemon) foundPokemon.favorite = false;
        favoritesPokemons.value = [...favoritesPokemons.value.filter(fp => fp.name !== pokemon.name)];    
    }

    const clearDetailPokemon = async () => {
        pokemonDetail.value = {}
    }

    return {
        allPokemons,
        pokemonDetail,
        favoritesPokemons,
        obtainPokemons,
        obtainDetailPokemon,
        addFavoritePokemon,
        removeFavoritePokemon,
        clearDetailPokemon
    }
});