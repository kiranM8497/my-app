import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const publicPaths = ["/", "/auth"];
  useEffect(() => {
    // Skip auth check on public routes
    if (publicPaths.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    axiosInstance
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
