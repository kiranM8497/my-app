// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import SignLanding from "../pages/Auth/SignLanding";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/auth",
    element: <SignLanding />,
  },
  {
    path: "/",
    element: <PrivateRoute />, // acts as layout wrapper for all private routes
    children: [
      {
        path: "/home",
        element: <Home />, // protected
      },
      // Add more protected routes here
    ],
  },
  //   {
  //   path: "/logout",
  //   element: <LogoutPage /> // clears cookie and redirects
  // }
]);

export default router;
