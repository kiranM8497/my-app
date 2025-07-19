import SignupFormDemo from "./SignupFormDemo";
import React from "react";
import { useEffect, useState } from "react";
import SigninForm from "./SignInForm";
import GlitchyLoading from "../../components/ui/glitchyLoading";

const SignLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <GlitchyLoading />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* === Background Layer === */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* === Foreground Content === */}
      <div className="relative z-30 w-full max-w-md mx-auto flex items-center justify-center px-4 md:px-8">
        <div className="w-full flex justify-center items-center py-12">
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
