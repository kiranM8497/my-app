import React from "react";

const GlitchyLoading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <div className="loader">
        <div data-glitch="Loading..." className="glitch">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default GlitchyLoading;
