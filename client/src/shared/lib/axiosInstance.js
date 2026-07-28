import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the token to every outgoing request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handling and automatic logout on 401
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Safely check for a 401 status using optional chaining
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login to prevent infinite loops or locked states
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;