// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Check if user has a token (or any auth indicator)
  const hasAuthToken = () => {
    // Assuming you store token in localStorage or cookie
    // Adjust this based on your token storage method
    return (
      localStorage.getItem("token") || document.cookie.includes("auth_token")
    );
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Only check /me if user might be authenticated
      if (hasAuthToken()) {
        try {
          const res = await axiosInstance.get("/auth/me");
          setUser(res.data.user);
        } catch (error) {
          console.error("Auth check failed:", error);
          setUser(null);
          // Clear invalid token
          localStorage.removeItem("token");
        }
      } else {
        setUser(null);
      }

      setLoading(false);
      setInitialized(true);
    };

    initializeAuth();
  }, []);

  // Method to manually trigger auth check after login
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/auth";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        initialized,
        logout,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
