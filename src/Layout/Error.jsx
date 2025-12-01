import React from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <div className="text-center animate-fadeIn">
        
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-500 drop-shadow-glow">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-300 mt-2 max-w-md mx-auto">
          Oops! It seems the page you're trying to access doesn't exist or has been moved.
        </p>

        <button
          onClick={handleGoBack}
          className="mt-6 py-2.5 px-8 text-lg bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          <span>🔙</span> Go Back
        </button>

      </div>
    </div>
  );
};

export default Error;
