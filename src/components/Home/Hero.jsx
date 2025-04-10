import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import background from "../../assets/background.jpg";
import SearchBar from "../Home/SearchBar";
import searchData from "../../assets/SearchData"; // Import searchData

const HeroSection = () => {
  // Extract unique locations from searchData
  const locations = [...new Set(searchData.map((item) => item.location))];

  const [filteredData, setFilteredData] = useState([]); // Initialize as an empty array

  const handleSearch = ({ keyword, location }) => {
    const keywordLower = keyword.toLowerCase();

    const filtered = searchData.filter((item) => {
      const matchesKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keywordLower) ||
        item.type.toLowerCase().includes(keywordLower) ||
        item.location.toLowerCase().includes(keywordLower);

      const matchesLocation = !location || item.location.toLowerCase() === location.toLowerCase();

      return matchesKeyword && matchesLocation;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="relative py-16 px-4 sm:px-10 w-full mt-20">
      {/* Background Image */}
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover "
      />

      {/* Overlay & Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-md">
          Find the perfect place to <br />
          Live with your family in Rwanda.
        </h1>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} locations={locations} />

        {/* Dropdown for Search Results */}
        {filteredData.length > 0 && (
          <div className="absolute top-20 w-full max-w-lg bg-white text-gray-800 rounded-lg shadow-lg z-20 mt-2">
            <div className="max-h-80 overflow-y-auto">
              {filteredData.map((item) => (
                <Link
                  key={item.id}
                  to={item.path} // Use the path property from searchData
                  className="block px-4 py-3 hover:bg-gray-100 transition duration-300"
                >
                  {/* Display only the name of the item */}
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No results message */}
        {filteredData.length === 0 && (
          <div className="text-white mt-10 text-lg bg-black/30 p-4 rounded-md">
            No results found for your search. Try a different keyword or location.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
