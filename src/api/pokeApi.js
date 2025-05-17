import axios from 'axios';

const pokeApi = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
    withCredentials: false,
});

export default pokeApi;