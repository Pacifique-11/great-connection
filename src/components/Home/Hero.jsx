import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssetPropertyStore } from "../../store/useAssetPropertyStore";

const HeroSection = () => {
  const navigate = useNavigate();
  const { setFilterParams, setActiveCategory } = useAssetPropertyStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setFilterParams({ search: searchQuery });
    setActiveCategory('properties');
    navigate('/properties');
  };

  return (
    <section className="relative w-full min-h-[200px] md:min-h-[280px] flex items-center justify-center overflow-hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
      {/* Background Image with Dark Professional Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://www.greatconnectionltd.com/homeImage.jpg"
          alt="Rwanda Real Estate Landscape"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-4 sm:px-6">

        {/* Optimized Typography Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.2] mb-6 drop-shadow-md">
          Find the perfect place to <br className="hidden sm:inline" />
          <span className="text-green-400 underline decoration-green-500/50 decoration-wavy underline-offset-8">
            live with your family
          </span> in Rwanda.
        </h1>

        {/* Subtitle Information */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl font-normal leading-relaxed mb-8 drop-shadow">
          Discover verified properties, modern homes, lands, and comprehensive listings tailored to match your ideal lifestyle and comfort.
        </p>

      </div>
    </section>
  );
};

export default HeroSection;
