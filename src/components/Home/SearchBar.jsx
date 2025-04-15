import React, { useState } from "react";
import { searchData } from "../../assets/SearchData";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    filterResults(value, location);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    filterResults(query, value);
  };

  const filterResults = (query, location) => {
    if (query.trim() !== "" || location.trim() !== "") {
      const filtered = searchData.filter((item) => {
        const searchField = item.title || item.name || item.type || "";
        const matchesQuery =
          query.trim() === "" ||
          (searchField && searchField.toLowerCase().includes(query.toLowerCase()));
        const matchesLocation =
          location.trim() === "" ||
          (item.location && item.location.toLowerCase().includes(location.toLowerCase()));

        return matchesQuery && matchesLocation;
      });
      setFilteredResults(filtered);
      setShowDropdown(true);
    } else {
      setFilteredResults([]);
      setShowDropdown(false);
    }
  };

  const handleItemClick = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by type, title, or name..."
          className="w-full sm:w-auto flex-grow px-4 py-3 text-gray-800 outline-none"
          value={query}
          onChange={handleInputChange}
        />

        {/* Location Dropdown */}
        <select
          className="w-full sm:w-auto px-4 py-3 border-t sm:border-t-0 sm:border-l text-gray-800 border-gray-300 outline-none text-sm sm:max-w-xs truncate"
          value={location}
          onChange={handleLocationChange}
        >
          <option value="">Select Location</option>
          <option value="Kigali">Kigali</option>
          <option value="Musanze">Musanze</option>
          <option value="Nyarutarama">Nyarutarama</option>
          <option value="Kibagabaga">Kibagabaga</option>
        </select>

        {/* Search Button */}
        <button
          className="w-full sm:w-auto bg-green-500 text-white px-4 py-3 hover:bg-green-600 transition"
          onClick={() => filterResults(query, location)}
        >
          Search
        </button>
      </div>

      {/* Dropdown Results */}
      {showDropdown && filteredResults.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white text-gray-800 shadow-lg w-full mt-2 rounded-lg max-h-60 overflow-y-auto z-10 sm:max-w-3xl sm:mx-auto">
          {filteredResults.map((item, index) => (
            <li
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item.path)}
            >
              {item.title || item.name} - {item.type} - {item.location}
            </li>
          ))}
        </ul>
      )}

      {/* No Results */}
      {showDropdown && filteredResults.length === 0 && (
        <div className="absolute bg-white text-gray-500 shadow-lg w-full mt-2 rounded-lg p-4">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
