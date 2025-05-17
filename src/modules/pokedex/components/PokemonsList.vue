<template>
    <div class="pokemons-list" v-for="pokemon in pokemons" :key="pokemon.name">
        <ListItem :pokemon="pokemon" class="pokemons-list-item" @click="handleClick(pokemon)" />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { usePokemon } from '@/modules/pokedex/store/usePokemon.js';
import { useLoader } from '@/store/useLoader';

export default {
    name: 'pokemonsList',
    props: {
        pokemons: {
            type: Array,
            required: true
        }
    },
    components: {
        ListItem: defineAsyncComponent(() => import('@/modules/pokedex/components/ListItem.vue')),
    },
    setup() {
        const loaderStore = useLoader();
        const pokemonStore = usePokemon();

        const handleClick = (pokemon) => {
            loaderStore.enableLoading();
            pokemonStore.obtainDetailPokemon(pokemon);
            loaderStore.disableLoading();
        };

        return {
            handleClick
        };
    }
}
</script>

<style scoped>
    .pokemons-list {
        width: 100%;
    }
    .pokemons-list-item {
        margin: 0 0 10px 0;
    }
</style>