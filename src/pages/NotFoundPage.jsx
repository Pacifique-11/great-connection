import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 text-center flex flex-col items-center">
        
        {/* Animated / Styled 404 Badge */}
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center font-black text-3xl sm:text-4xl shadow-inner mb-6 tracking-tighter">
          404
        </div>

        {/* Heading & Error Message */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link to="/" className="w-full">
            <button className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default NotFoundPage;