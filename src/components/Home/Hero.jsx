import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Home/SearchBar";

const HeroSection = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async ({ keyword, location, minPrice, maxPrice, status }) => {
    console.log("Search submitted with:", { keyword, location, minPrice, maxPrice, status });

    try {
      const query = new URLSearchParams();

      if (keyword) query.append("search", keyword);
      if (location) query.append("location", location);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (status) query.append("status", status);

      // Optional category field
      query.append("category", "properties");

      const response = await fetch(`https://easy-renting-bn.onrender.com/api/search?${query.toString()}`);
      const data = await response.json();

      setFilteredData(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
      setFilteredData([]);
      setHasSearched(true);
    }
  };

  return (
    <div className="relative h-auto py-6 w-full mt-30">
      {/* Background Image */}
      <img
        src="./homeImage.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
          Find the perfect place to <br />
          live with your family in Rwanda.
        </h1>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Results Dropdown */}
        {filteredData.length > 0 && (
          <div className="w-full max-w-lg mt-4 bg-white text-gray-800 rounded-lg shadow-lg z-20">
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-200">
              {filteredData.map((item) => (
                <Link
                  key={item._id || item.id}
                  to={item.path || "#"}
                  className="block px-4 py-3 hover:bg-gray-100 transition duration-200"
                >
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {hasSearched && filteredData.length === 0 && (
          <div className="text-white mt-6 text-lg bg-black/40 px-6 py-4 rounded-md backdrop-blur-sm">
            No results found. Try a different keyword, location, or status.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
