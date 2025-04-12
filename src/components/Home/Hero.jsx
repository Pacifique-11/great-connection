
import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/background.jpg";
import SearchBar from "../Home/SearchBar";
import { searchData } from "../../assets/SearchData"; // ✅ Fix here


const HeroSection = () => {
  const locations = [...new Set(searchData.map((item) => item.location))];

  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = ({ keyword, location }) => {
    const keywordLower = keyword.toLowerCase();

    const filtered = searchData.filter((item) => {
      const matchesKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keywordLower) ||
        item.type.toLowerCase().includes(keywordLower) ||
        item.location.toLowerCase().includes(keywordLower);

      const matchesLocation =
        !location || item.location.toLowerCase() === location.toLowerCase();

      return matchesKeyword && matchesLocation;
    });

    setFilteredData(filtered);
    setHasSearched(true);
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
        <SearchBar onSearch={handleSearch} locations={locations} />

        {/* Results Dropdown */}
        {filteredData.length > 0 && (
          <div className="w-full max-w-lg mt-4 bg-white text-gray-800 rounded-lg shadow-lg z-20">
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-200">
              {filteredData.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
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
            No results found. Try a different keyword or location.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
