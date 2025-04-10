import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, locations }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ keyword, location });
    }
  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    // Example filtering logic (replace with real data if needed)
    if (value.length > 1) {
      const dummySuggestions = [
        { id: 1, name: "Kigali Villa", location: "Kigali" },
        { id: 2, name: "Huye House", location: "Huye" },
        { id: 3, name: "Musanze Apartment", location: "Musanze" },
      ];
      const filtered = dummySuggestions.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion.name);
    setSuggestions([]);
    navigate(`/details/${suggestion.id}`); // 👈 navigate to the details page
  };

  return (
    <div className="relative w-full max-w-3xl">
      {/* Inputs and Button */}
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-3 sm:p-2 space-y-3 sm:space-y-0 sm:space-x-2 w-full">
        <input
          type="text"
          placeholder="Enter Keyword here ..."
          value={keyword}
          onChange={handleKeywordChange}
          className="flex-1 px-4 py-2 sm:py-3 rounded-md outline-none text-gray-800 w-full sm:w-auto"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 sm:py-3 bg-white border-l text-gray-800 outline-none w-full sm:w-auto"
        >
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-full z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.name} — <span className="text-gray-500">{suggestion.location}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
