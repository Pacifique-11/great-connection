import React from "react";
import background from "../../assets/background.jpg";

const HeroSection = () => {
  return (
    <div className="relative h-auto py-6 w-full mt-20">
      {/* Background Image */}
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay & Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full 
      text-white text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Find the perfect place to <br />
          Live with your family in Rwanda.
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-3 sm:p-2 space-y-3 sm:space-y-0 sm:space-x-2 w-full max-w-3xl">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Enter Keyword here ..."
            className="flex-1 px-4 py-2 sm:py-3 rounded-md outline-none text-gray-800 w-full sm:w-auto"
          />

          {/* Dropdown Select */}
          <select className="px-4 py-2 sm:py-3 bg-white border-l text-gray-800 outline-none w-full sm:w-auto">
            <option>Select Location</option>
            <option>Kigali</option>
            <option>Bugesera</option>
          </select>

          {/* Search Button */}
          <button className="bg-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md w-full sm:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
