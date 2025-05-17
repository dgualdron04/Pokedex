<template>
    <div class="container">
        <!-- {{ pokemonDetail }} -->
        <Details v-if="Object.keys(pokemonDetail).length" :pokemon="pokemonDetail" :isVisible="isVisible" @closeDetails="handleCloseDetails" @btnFavorite="handleBtnFavorite" />
        <div class="list" >
            <div class="list__container">
                <div class="list__field">
                    <SearchInput @search="handleSearch" />
                </div>
                <div v-if="pokemons.length == 0" class="list__text-container" >
                    <div class="list__text">
                        <p class="list__text-title">Uh-Oh!</p>
                        <p class="list__text-description">You look lost on your journey!</p>
                    </div>
                    <BaseButton @clickBtn="handleReturnButton" type="button" v-if="pokemons.length == 0">
                        Go back home
                    </BaseButton>
                </div>
                <div class="list__data" v-else>
                    <PokemonsList :pokemons="isSearching ? filteredPokemons : pokemons" />
                    <div class="list__data-nav" @click.stop>
                        <div class="list__data-nav__container">
                            <BaseButton class="list__data-all" @clickBtn="handleObtainAllPokemons"
                            :inactive="currentTab== 'favorites'">
                                <Tabs />
                                <span>All</span>
                            </BaseButton>
                            <BaseButton class="list__data-favorites" @clickBtn="handleObtainPokemonsFavorites"
                            :inactive="currentTab== 'all'">
                                <StarNormal />
                                <span>Favorites</span>
                            </BaseButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref, computed, watch } from 'vue';
import { useLoader } from '@/store/useLoader';
import { usePokemon } from '@/modules/pokedex/store/usePokemon.js';	
import { useRouter } from 'vue-router';
import StarNormal from '../../../components/SvgComponents/StarNormal.vue';
import Details from '../components/Details.vue';

    export default {
        name: 'List',
        components: {
            SearchInput: defineAsyncComponent(() => import('@/components/SearchInput.vue')),
            BaseButton: defineAsyncComponent(() => import('@/components/BaseButton.vue')),
            PokemonsList: defineAsyncComponent(() => import('@/modules/pokedex/components/PokemonsList.vue')),
            Tabs: defineAsyncComponent(() => import('@/components/SvgComponents/Tabs.vue')),
            StarNormal: defineAsyncComponent(() => import('@/components/SvgComponents/StarNormal.vue')),
            Details: defineAsyncComponent(() => import('@/modules/pokedex/components/Details.vue')),
        },
        setup() {
            const router = useRouter();
            const loaderStore = useLoader();
            const pokemonStore = usePokemon();

            const pokemonDetail = ref({});

            const isSearching = ref(false);
            const isVisible = ref(false);
            const searchTerm = ref('');

            const currentTab = ref('all');

            const pokemons = computed(() =>
                currentTab.value === 'all'
                    ? pokemonStore.allPokemons
                    : pokemonStore.favoritesPokemons
            );

            const filteredPokemons = computed(() => {
                if (!isSearching.value || searchTerm.value.trim() === '') {
                    return pokemons.value;
                }
                return pokemons.value.filter(p =>
                    p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
                );
            });
            
            onMounted(async () => {
                loaderStore.enableLoading();
                await pokemonStore.obtainPokemons();
                pokemons.value = [...pokemonStore.allPokemons];
                loaderStore.disableLoading();
            });

            watch(
                () => pokemonStore.pokemonDetail,
                (newDetail) => {
                    if (newDetail) {
                        if (Object.keys(newDetail).length > 0) {
                            pokemonDetail.value = {...newDetail};
                            pokemons.value = [...pokemonStore.allPokemons];
                            
                            isVisible.value = true;
                        }
                    }
                },
                { immediate: false, deep: true }
            );

            const handleSearch = (term) => {
                searchTerm.value = term;
                isSearching.value = term.trim().length > 0;
            };

            const handleReturnButton = () => {
                loaderStore.enableLoading();
                router.push({ name: 'pokedex.welcome' })
                    .then(() => {
                        loaderStore.disableLoading();
                    })
                    .catch(() => {
                        loaderStore.disableLoading();
                    });
            }

            const handleObtainPokemonsFavorites = () => currentTab.value = 'favorites';
            const handleObtainAllPokemons = () => currentTab.value = 'all';

            const handleCloseDetails = () => {
                pokemonStore.clearDetailPokemon();
                isVisible.value = false;
                pokemonDetail.value = {};
            };

            const handleBtnFavorite = (pokemon) => {
                loaderStore.enableLoading();
                const findPokemon = pokemons.value.find(p => p.name == pokemon.name);
                
                if (!findPokemon.favorite) {
                    pokemonStore.addFavoritePokemon(findPokemon);
                    findPokemon.favorite = true;
                    pokemon.favorite = true;
                } else {
                    pokemonStore.removeFavoritePokemon(findPokemon);
                    pokemon.favorite = false;
                    findPokemon.favorite = false;
                }
                loaderStore.disableLoading();
            };
            

            return {
                pokemons,
                filteredPokemons,
                isSearching,
                pokemonDetail,
                currentTab,
                isVisible,
                handleSearch,
                handleCloseDetails,
                handleReturnButton,
                handleBtnFavorite,
                handleObtainAllPokemons,
                handleObtainPokemonsFavorites
            };
        },
    };
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.list {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100dvh;
    justify-content: start;
    text-align: center;
    width: 100%;
    overflow-y: scroll;
}

.list .list__container {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100dvh;
    justify-content: start;
    text-align: center;
    width: 100%;
    max-width: 570px;
    /* overflow-y: scroll; */
}

.list .list__field {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 35px 30px 40px 30px;
    box-sizing: border-box;
}

.list .list__text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
}

.list .list__text .list__text-title {
    color: #353535;
    font-family: 'Lato', sans-serif;
    font-size: 36px;
    font-weight: bold;
    line-height: normal;
    margin: 10px 0;
}

.list .list__text .list__text-description {
    color: #5E5E5E;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    margin: 0 0 25px 0;
}

.list .list__data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    /* margin-bottom: 90px; */
    padding-bottom: 100px;
}

.list .list__data-nav {
    bottom: 0;
    position: absolute;
    width: 100%;
    background-color: #FFF;
    box-sizing: border-box;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 18px 30px;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);

}

.list .list__data-nav .list__data-nav__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 600px;
}

.list .list__data-nav .list__data-all {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.list .list__data-nav .list__data-favorites {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
}

.list .list__data-nav .list__data-all span,
.list .list__data-nav .list__data-favorites span {
    margin-left: 10px;
}

@media (min-width: 600px) {
    .list .list__field {
        padding: 35px 0 40px 0;
    }

    .list .list__data {
        padding: 0;
        padding-bottom: 100px;
    }

    .list .list__data-nav .list__data-nav__container {
        width: 570px;
    }

    .list .list .list__container {
        width: 570px;
    }
}

</style>