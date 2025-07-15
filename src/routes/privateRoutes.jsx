import Home from "../pages/Home";
import PrivateRoute from "../components/PrivateRoute";

export default [
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];
