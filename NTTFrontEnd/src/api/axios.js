import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Usará el proxy en desarrollo
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para debug
api.interceptors.request.use(config => {
  console.log('Request:', config.method?.toUpperCase(), config.url);
  return config;
});

api.interceptors.response.use(response => {
  console.log('Response:', response.status, response.data);
  return response;
}, error => {
  console.error('API Error:', error.response?.status, error.message);
  return Promise.reject(error);
});

export default api;