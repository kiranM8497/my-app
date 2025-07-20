import SignupFormDemo from "./SignupFormDemo";
import React from "react";
import { useEffect, useState } from "react";
import SigninForm from "./SignInForm";
import GlitchyLoading from "../../components/ui/glitchyLoading";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const { user, loading, initialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (initialized && !loading && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, initialized, navigate]);

  // Show loading while auth context initializes or component loads
  if (isLoading || !initialized) {
    return (
      <div>
        <GlitchyLoading />
      </div>
    );
  }

  // Don't render auth forms if user is authenticated (during redirect)
  if (user) {
    return (
      <div>
        <GlitchyLoading />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          // src="https://motionbgs.com/media/7474/narutos-restful-thoughts.960x540.mp4"
          src="https://motionbgs.com/media/153/sasuke.960x540.mp4"
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* === Foreground Content === */}
      <div className="relative z-30 w-full overflow-y-hidden flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-sm flex justify-center items-center py-12">
          {isLogin ? (
            <SigninForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupFormDemo onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignLanding;
