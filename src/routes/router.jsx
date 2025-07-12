// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import SplashScreen from "../pages/SplashScreen";
import SignLanding from "../pages/Auth/SignLanding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/auth",
    element: <SignLanding />,
  },
]);

export default router;
