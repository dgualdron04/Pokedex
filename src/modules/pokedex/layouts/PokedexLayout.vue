<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script>
    export default {
        name: 'PokedexLayout',
    };
</script>

<style scoped>

    main {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>