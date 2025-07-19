import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GlitchyLoading from "./ui/glitchyLoading";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">
          <GlitchyLoading />
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to auth page, preserving the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
