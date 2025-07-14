import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom"; // 👈 make sure this is imported
import axiosInstance from "../components/lib/axios";

const Home = () => {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout");

      // Clear local user state
      setUser(null);

      // Redirect to login
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;

  return (
    <div>
      <h1>Welcome, {user.name || user.firstname}!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
