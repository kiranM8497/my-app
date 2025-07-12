// src/pages/SplashScreen.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Start transition
      setIsTransitioning(true);
      navigate("/auth", { replace: true });

      // Navigate after transition completes
      // setTimeout(() => {
      //   navigate("/auth", { replace: true });
      // }, 1000); // 1 second transition duration
    }, 4000); // Start transition 1 second earlier

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden transition-opacity duration-1000 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black" />
      {/* Video Background */}
      {!videoError && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-1"
          // src="/assets/zenitsu-swordsmanship.1920x1080.mp4"
          src="https://motionbgs.com/media/5028/zenitsu-demon-slayer.1920x1080.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          onCanPlay={() => console.log("Video can play")}
          preload="auto"
        />
      )}

      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <div
          className={`text-center transition-all duration-1000 ${
            isTransitioning
              ? "transform scale-110 opacity-0"
              : "animate-fade-in"
          }`}
        >
          {/* <p className="text-lg md:text-xl text-gray-200 mb-8">
            Your safe space for truth
          </p> */}

          {/* Loading animation */}
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            {/* <span className="text-sm text-gray-300">
              {isTransitioning
                ? "Entering..."
                : videoLoaded
                ? "Ready..."
                : "Loading..."}
            </span> */}
          </div>

          {/* Show error if video fails */}
          {videoError && (
            <p className="text-red-400 text-sm mt-2">
              Video unavailable - using fallback background
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
