// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Routes where we don't need to check authentication
  const isAuthRoute = () => {
    const path = window.location.pathname;
    const authRoutes = ["/auth", "/login", "/register", "/forgot-password"];
    return authRoutes.some((route) => path.startsWith(route));
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Skip auth check for auth-related routes
      if (isAuthRoute()) {
        console.log("inside if");
        setUser(null);
        setLoading(false);
        setInitialized(true);
        return;
      }

      try {
        // For other routes, check authentication status
        const res = await axiosInstance.get("/auth/me");

        setUser(res.data.user);
      } catch (error) {
        // If the request fails (401/403), user is not authenticated
        if (error.response?.status === 401 || error.response?.status === 403) {
          setUser(null);
        } else {
          console.error("Auth check failed:", error);
          setUser(null);
        }
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Method to manually trigger auth check after login
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log(res);
      // setUser(res.data.user);
      // return res.data.user;
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
      // Make sure to call the correct logout endpoint
      // This should clear the httpOnly cookie on the server
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      // Redirect after clearing user state
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
