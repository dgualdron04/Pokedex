<template>
  <div class="loader-container">
    <LoaderSVG alt="Loading" class="loader" />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "Loader",
  components: {
    LoaderSVG: defineAsyncComponent(() => import("@/components/SvgComponents/Loader.vue")),
  }
};
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
}

.loader {
  width: 80px;
  height: 80px;
  animation: rotatePulse 1.5s infinite ease-in-out;
}

@keyframes rotatePulse {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: rotate(180deg) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.8;
  }
}
</style>
