"use client";

import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-white text-black px-4  ">
      <p className="text-center text-base md:text-lg max-w-md">
        Select a <strong>course</strong> and <strong>module</strong> to find out
        the video.
      </p>

      <h1 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-center">
        Content Available here<span className="animate-pulse"> .... </span>
      </h1>

      {/* Progress Bar */}
      {/* <div className="w-3/4 md:w-1/2 h-2 bg-gray-300 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div> */}
    </div>
  );
};

export default LoadingScreen;
