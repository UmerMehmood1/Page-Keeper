import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI || "http://localhost:5000", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor (optional, no need for token in Authorization header)
axiosInstance.interceptors.request.use(
  (config) => {
    // Any other custom configuration for each request can go here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Global error handling for responses
    if (error.response?.status === 401) {
      console.error("Unauthorized - Redirecting to login...");
      // Optional: Redirect user to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
