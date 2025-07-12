import { SignupFormDemo } from "./SignupFormDemo";
import { cn } from "../../components/lib/utils";
import { Boxes } from "../../components/ui/background-boxes"; // ensure you have this or stub it
import { useEffect, useState } from "react";

const SignLanding = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate component mounting
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
        {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div> */}
        <div className="loader">
          <div data-glitch="Loading..." class="glitch">
            Loading...
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
        </div>
      </div>

      {/* === Foreground Content === */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Right Side (Signup Form) */}
        <div className="w-full md:full flex justify-center items-center py-12">
          <SignupFormDemo />
        </div>
      </div>
    </div>
  );
};

export default SignLanding;
