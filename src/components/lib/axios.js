// src/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:2000/api", // use env or fallback
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if your backend uses cookies/auth
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // maybe redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
