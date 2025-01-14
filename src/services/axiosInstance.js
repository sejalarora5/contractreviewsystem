import axios from 'axios';
import { store } from '../redux/store'; 
import { clearState, logoutUser } from '../redux/slices/authSlice';

// Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Your API base URL
    timeout: 60000, // Request timeout in milliseconds
});

// Function to get current token from Redux store
const getToken = () => {
    const state = store.getState();
    return state.auth.token; // Adjust based on your Redux state structure
};

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log('token123',token )
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Default content type
        // config.headers['Content-Type'] = 'application/json';
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle token expiration
            if (error.response.status === 401) {
                store.dispatch(logoutUser());
                store.dispatch(clearState())
                // Redirect to login page
                window.location.href = '/login';
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

// Helper functions for different content types
export const setMultipartHeader = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
};

export const setJSONHeader = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
};

export default axiosInstance;