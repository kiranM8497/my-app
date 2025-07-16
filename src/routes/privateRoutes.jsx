import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";
import ProfilePage from "../pages/Profile";

export default [
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <ProfilePage />,
      },
    ],
  },
];
