import SplashScreen from "../pages/SplashScreen";
import SignLanding from "../pages/Auth/SignLanding";

export default [
  {
    path: "/",
    element: <SplashScreen />,
  },
  {
    path: "/auth",
    element: <SignLanding />,
  },
];
