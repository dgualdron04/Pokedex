    <template>
        <div v-if="isVisible" class="details">
            <div class="details-container">
                <div class="details-container__card">
                    <div class="details-container__card-img">
                        <img :src="principalImage" alt="">
                        <XMark class="details-container__card-x" @click="handleCloseDetails" />
                    </div>
                    <ul class="details-container__card-info">
                        <li>
                            <p><strong>Name:</strong> {{ toCamelCase(pokemon?.name) }}</p>
                        </li>
                        <li>
                            <p><strong>Weight:</strong> {{ pokemon?.details?.weight }}</p>
                        </li>
                        <li>
                            <p><strong>Height:</strong> {{ pokemon?.details?.height }}</p>
                        </li>
                        <li>
                            <p><strong>Types:</strong> {{ typesString }}</p>
                        </li>   
                    </ul>
                    <div class="details-container__card-btns">
                        <BaseButton type="button" @clickBtn="handleShareDetails">
                            <span>Share to my friends</span>
                        </BaseButton>
                        <StarSvg :favorite="pokemon?.favorite" @clickBtn="handleToggleFavoriteButton" />
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
    import { defineAsyncComponent, ref, watch, onMounted } from 'vue';
    import useFunctions from '@/composables/useFunctions.js';
    import { usePokemon } from '@/modules/pokedex/store/usePokemon.js';
    import { useLoader } from '@/store/useLoader';

    export default {
    name: 'Details',
    props: {
        pokemon: {
            type: Object,
            required: true
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        BaseButton: defineAsyncComponent(() => import('@/components/BaseButton.vue')),
        StarSvg: defineAsyncComponent(() => import('@/modules/pokedex/components/Star.vue')),
        XMark: defineAsyncComponent(() => import('@/components/SvgComponents/XMark.vue')),
    },
    emits: ['closeDetails', 'btnFavorite'],
    setup(props, { emit }) {
        const pokemon = props.pokemon;
        const { toCamelCase } = useFunctions();

        const handleCloseDetails = () => {
            emit('closeDetails');
        };

        onMounted(() => {
            console.log(pokemon.value);
            
        });

        const typesString = ref('');
        const principalImage = ref('');

        onMounted(() => {
            typesString.value = [...(pokemon.details?.types?.map(t => toCamelCase(t.type.name)) || [])].join(', ');
            principalImage.value = pokemon.details?.sprites?.other['official-artwork']?.front_default || '';
            console.log(typesString.value);
            console.log(principalImage.value);
        });

        const handleToggleFavoriteButton = () => {
            emit('btnFavorite', pokemon);
        };

        const handleShareDetails = () => {
            const name = `Name: ${toCamelCase(pokemon?.details?.name)}`;
            const weight = `Weight: ${pokemon?.details?.weight}`;
            const height = `Height: ${pokemon?.details?.height}`;
            const types = `Types: ${typesString.value}`;

            const shareText = `${name}, ${weight}, ${height}, ${types}`;
            
            navigator.clipboard.writeText(shareText);
            alert('Detalles copiados al portapapeles.');
        };

        return {
            pokemon,
            toCamelCase,
            typesString,
            principalImage,
            handleCloseDetails,
            handleToggleFavoriteButton,
            handleShareDetails
        };
    }
    };
    </script>

    <style scoped>
        .details {
            width: 100%;
            height: 100dvh;
            background-color: rgba(0, 0, 0, .6);
            position: absolute;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .details .details-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 0 30px;
        }

        .details .details-container .details-container__card {
            background-color: #FFF;
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
        }

        .details-container__card-img {
            position: relative;
            background-image:  url('../../../assets/background.svg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 200px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
        }

        .details-container__card-x {
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;
        }

        .details-container__card-img img {
            width: 100%;
            height: 100%;
            max-width: 180px;
            max-height: 180px;
            object-fit: contain;
            object-position: center;
        }

        .details-container__card-info {
            list-style: none;
            padding: 10px 30px 0 30px;
            margin: 0;
        }

        .details-container__card-info li {
            margin: 0;
            padding: 10px 0 10px 0;
            border-bottom: 1px solid #E8E8E8;
        }

        .details-container__card-info li p {
            margin: 0;
            font-family: 'Lato', sans-serif;
            font-size: 18px;
            font-weight: 500;
            color: #5E5E5E;
        }

        .details-container__card-btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
        }

        @media (min-width: 570px) {
           .details .details-container {
                width: 570px;
                padding: 0;
           }
        }
    </style>