<template>
    <div class="app">
      <Loader v-if="isLoading" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>  
    </div>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue';
import { useLoader } from '@/store/useLoader';

export default {
  name: 'App',
  components: {
    Loader: defineAsyncComponent(() => import('@/components/Loader.vue')),
  },
  setup() {
    const loaderStore = useLoader();

    const isLoading = computed(() => loaderStore.isLoading);

    return {
      isLoading,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
  height: 100dvh;
  background-color: #F9F9F9;
}
</style>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

@media (max-width: 570px) {
  .app {
    display: block;
  }
}
</style>