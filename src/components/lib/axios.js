// src/components/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
  withCredentials: true, // Important: This sends HttpOnly cookies automatically
});

// Response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Authentication failed - clear local indicators
      localStorage.removeItem("isLoggedIn");
      // Redirect to auth page
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
