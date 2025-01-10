import axios from 'axios';
import { store } from '../redux/store';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Your base URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request/response interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add token to headers if it exists
    const token = store.getState().auth.token;
    // const token = useSelector((state) => state.auth.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
