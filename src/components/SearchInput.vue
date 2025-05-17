<template>
    <div class="search-input">
        <SearchSvg class="search-input__icon" />
        <input type="text" placeholder="Search" v-model="searchTerm" @input="handleInput" class="search-input__field" />
    </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue';

export default {
    name: 'SearchInput',
    components: {
        SearchSvg: defineAsyncComponent(() => import('@/components/SvgComponents/Search.vue')),
    },
    emits: ['search'],
    setup(_, { emit }) {
        const searchTerm = ref('');

        const handleInput = (event) => {
            emit('search', searchTerm.value);
        }

        return {
            handleInput,
            searchTerm
        }
    }
};
</script>

<style>
    .search-input {
        align-items: center;
        background-color: #FFF;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
        display: flex;
        justify-content: left;
        padding: 16px 15px;
        width: 100%;
        border-radius: 5px;
    }

    .search-input .search-input__icon {
        margin-left: 0;
        margin-right: 10px;
    }

    .search-input .search-input__field {
        background-color: transparent;
        border: none;
        color: #353535;
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 500;
        outline: none;
        width: 100%;
    }

    .search-input .search-input__field::placeholder {
        color: #BFBFBF;
        font-family: 'Montserrat', sans-serif;
        line-height: 140%;
    }
</style>