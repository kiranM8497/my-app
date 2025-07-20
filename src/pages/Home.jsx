import { Navigate } from "react-router-dom"; // 👈 make sure this is imported
import PostCreator from "../components/PostCreator";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loading, setUser } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  console.log(user);
  return (
    <div>
      <PostCreator />
    </div>
  );
};

export default Home;
