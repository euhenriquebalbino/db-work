import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  timeout: 15000
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data?.message ?? 'Nao foi possivel completar a operacao.')
);
