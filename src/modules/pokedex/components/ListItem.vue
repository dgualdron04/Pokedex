<template>
    <div class="list-item">
        <p>{{ toCamelCase(pokemon.name) }}</p>
        <div @click.stop>
            <StarSvg :favorite="pokemon.favorite" @clickBtn="handleToggleFavoriteButton"  />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue';
import useFunctions from '@/composables/useFunctions.js';
import { usePokemon } from '@/modules/pokedex/store/usePokemon.js';
import { useLoader } from '@/store/useLoader';

export default {
    name: 'ListItem',
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    },
    components: {
        StarSvg: defineAsyncComponent(() => import('@/modules/pokedex/components/Star.vue'))
    },
    setup(props) {
        const pokemon = computed(() => props.pokemon);
        const { toCamelCase } = useFunctions();
        const pokemonStore = usePokemon();
        const loaderStore = useLoader();

        const handleToggleFavoriteButton = (event) => {
            console.log(pokemon.value);
            
            
            loaderStore.enableLoading();
            event?.stopPropagation();
            if (!pokemon.value.favorite) {
                pokemonStore.addFavoritePokemon(pokemon.value)
                pokemon.value.favorite = true;
            } else {
                pokemonStore.removeFavoritePokemon(pokemon.value);
                pokemon.value.favorite = false;
            }
            loaderStore.disableLoading();
        };

        return {
            pokemon,
            toCamelCase,
            handleToggleFavoriteButton
        };
    }
};
</script>

<style scoped>
    .list-item {
        align-items: center;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        padding: 8px 10px 8px 20px;
    }

    .list-item p {
        color: #353535;
        font-family: 'Lato', sans-serif;
        font-size: 22px;
        font-weight: 500;
        margin: 0;
    }
</style>