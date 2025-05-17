import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoader = defineStore('useLoader', () => {

    const isLoading = ref(false)
    const enableLoading = () => {
        isLoading.value = true
    }

    const disableLoading = () => {
        isLoading.value = false
    }

    return {
        isLoading,
        enableLoading,
        disableLoading
    }
}); 