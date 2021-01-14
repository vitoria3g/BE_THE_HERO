//integração com serviços externos
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333/', //base de URL usando na API que iremos conectar
});

export default api;