// src/components/ui/BackgroundBeams/BackgroundBeams.jsx
import React from "react";
import "./background-beams.css"; // custom styles (optional)

const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div className="h-full w-full relative animate-fade">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-pulse-fast" />
        <div className="absolute inset-0 bg-slate-900 [mask-image:radial-gradient(transparent,black)]" />
      </div>
    </div>
  );
};

export default BackgroundBeams;
