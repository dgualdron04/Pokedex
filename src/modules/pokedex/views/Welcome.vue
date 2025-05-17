<template>
    <div class="welcome">
        <PikachuSVG class="pikachu-svg" />
        <div class="welcome__text">
            <p class="welcome__text-title">Welcome to Pokédex</p>
            <p class="welcome__text-description">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
        </div>
        <BaseButton @clickBtn="handleButtonClick" type="button">Get Started</BaseButton>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { useLoader } from '@/store/useLoader';
import { useRouter } from 'vue-router';

export default {
    name: 'Welcome',
    components: {
        BaseButton: defineAsyncComponent(() => import('@/components/BaseButton.vue')),
        PikachuSVG: defineAsyncComponent(() => import('@/components/SvgComponents/Pikachu.vue')),
    },
    setup() {
        const router = useRouter();
        const loaderStore = useLoader();

        const handleButtonClick = (event) => {
            loaderStore.enableLoading();
            router.push({ name: 'pokedex.list' })
                .then(() => {
                    loaderStore.disableLoading();
                })
                .catch(() => {
                    loaderStore.disableLoading();
                });
        }

        return {
            handleButtonClick
        }
    }
};
</script>


<style scoped>
    .welcome {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100dvh;
        justify-content: center;
        text-align: center;
        width: 100%;
    }

    .welcome .pikachu-svg {
        height: 18rem;
        margin-bottom: 3.1rem;
        width: 18rem;
    }

    .welcome .welcome__text {
        margin-bottom: 3.1rem;
        padding: 0 1rem;
    }

    .welcome .welcome__text .welcome__text-title {
        color: #353535;
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 1.8rem;
    }

    .welcome .welcome__text .welcome__text-description {
        color: #5E5E5E;
        font-size: 18px;
        font-weight: 400;
        line-height: 150%;
    }
</style>