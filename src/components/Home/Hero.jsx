import React from "react";

const HeroSection = () => {

  return (
    <div className="relative h-[250px] py-2 w-full mt-20">
      {/* Background Image */}
      <img
        src="./homeImage.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />
      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-6 leading-tight drop-shadow-lg">
          Find the perfect place to <br />
          live with your family in Rwanda.
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;