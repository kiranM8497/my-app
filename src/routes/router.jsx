// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";
import SignLanding from "../pages/Auth/SignLanding";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <SignLanding />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
