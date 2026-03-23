import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach token on every request
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('shopwave_user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('shopwave_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
