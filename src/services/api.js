import axios from 'axios';

const api = axios.create({
    baseURL : "https://to-be-a-hero.onrender.com",
})

export default api;