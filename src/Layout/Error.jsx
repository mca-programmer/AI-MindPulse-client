import React from 'react';
import { useNavigate } from 'react-router';

const Error = () => {
 const navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1); // This will navigate the user back to the previous page
  };
    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-400">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={handleGoBack}
          className="mt-6 py-2 px-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <span className="mr-2">🔙</span> Go Back
        </button>
      </div>
    </div>
    );
};

export default Error;