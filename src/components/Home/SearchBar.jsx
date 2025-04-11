import React, { useState } from "react";
import { searchData } from "../../assets/SearchData";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(""); // State for selected location
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    filterResults(value, location); // Call the filter function with both query and location
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    filterResults(query, value); // Call the filter function with both query and location
  };

  const filterResults = (query, location) => {
    if (query.trim() !== "" || location.trim() !== "") {
      const filtered = searchData.filter((item) => {
        const searchField = item.title || item.name; // Use `title` or `name`
        const matchesQuery =
          query.trim() === "" ||
          (searchField && searchField.toLowerCase().includes(query.toLowerCase()));
        const matchesLocation =
          location.trim() === "" ||
          (item.location && item.location.toLowerCase().includes(location.toLowerCase()));

        return matchesQuery && matchesLocation; // Match both query and location
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
    <div style={{ position: "relative", maxWidth: "700px", margin: "auto" }}>
      <div className="flex border text-black bg-amber-100 rounded-full overflow-hidden shadow-lg">
        <input
          type="text"
          placeholder="Enter Keyword here ..."
          className="px-6 py-3 flex-grow outline-none"
          value={query}
          onChange={handleInputChange}
        />
        <select
          className="px-4 border-l outline-none"
          value={location}
          onChange={handleLocationChange}
        >
          <option value="">Select Location</option>
          <option value="Kigali">Kigali</option>
          <option value="Musanze">Musanze</option>
          <option value="Nyarutarama">Nyarutarama</option>
          <option value="Kibagabaga">Kibagabaga</option>
          {/* Add more locations */}
        </select>
        <button className="bg-green-500 text-white px-6">Search</button>
      </div>

      {showDropdown && filteredResults.length > 0 && (
        <ul className="absolute bg-white text-black shadow-md w-full mt-1 rounded-md max-h-60 overflow-y-auto z-10">
          {filteredResults.map((item, index) => (
            <li
              key={index}
              className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item.path)}
            >
              {item.title || item.name} - {item.location}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && filteredResults.length === 0 && (
        <div className="absolute bg-white shadow-md w-full mt-1 rounded-md p-4 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
