import { SignupFormDemo } from "./SignupFormDemo";

import { cn } from "../../components/lib/utils";
import { Boxes } from "../../components/ui/background-boxes";
import { useEffect, useState } from "react";
import { SigninForm } from "./SignInForm";

const SignLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        <div className="loader">
          <div data-glitch="Loading..." className="glitch">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="h-full w-full relative">
          <Boxes />
          <div className="absolute inset-0 w-full h-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
        </div>
      </div>

      {/* === Foreground Content === */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="w-full md:w-full flex justify-center items-center py-12">
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
