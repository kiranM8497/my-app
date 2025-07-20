// src/components/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
  withCredentials: true,
});

// Request interceptor to add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      // Redirect to auth page
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
