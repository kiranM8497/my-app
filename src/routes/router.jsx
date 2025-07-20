// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import SignLanding from "../pages/Auth/SignLanding";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/auth",
    element: <SignLanding />,
  },
  // Private routes
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
