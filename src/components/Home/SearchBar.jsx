import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [status, setStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "rent", label: "Rent" },
    { value: "buy", label: "Buy" },
  ];

  const categoryOptions = [
    { value: "apartment", label: "Apartment" },
    { value: "car", label: "Car" },
    { value: "house", label: "House" },
    { value: "hotel", label: "Hotel" },
    { value: "land", label: "Land" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (keyword.trim() === "" && !status && !category) {
        setFilteredResults([]);
        return;
      }

      setLoading(true);
      try {
        const selectedStatus = status ? status.value : "";
        const selectedCategory = category ? category.value : ""; 

        const queryParams = {
          search: keyword,
          status: selectedStatus,
        };

        // Only include category if it has a valid value
        if (selectedCategory) {
          queryParams.category = selectedCategory;
        }

        const query = new URLSearchParams(queryParams).toString();

        console.log("Query Parameters:", queryParams);

        const response = await axios.get(
          `https://easy-renting-bn.onrender.com/api/search?${query}`
        );

        setFilteredResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [keyword, status, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedStatus = status ? status.value : "";
    const selectedCategory = category ? category.value : "";
    onSearch({ keyword, status: selectedStatus, category: selectedCategory });
    console.log("Search submitted with:", { keyword, selectedStatus, selectedCategory });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white p-5 rounded-xl shadow-lg w-full"
      >
        {/* Keyword input */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by title, location, type..."
          className="px-4 py-3 outline-none text-sm w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-500"
        />

        {/* Status dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            options={statusOptions}
            value={statusOptions.find(
              (option) => option.value === (status ? status.value : "")
            )}
            onChange={setStatus}
            className="text-sm text-gray-800"
            classNamePrefix="react-select"
            placeholder="Select Status"
            isSearchable={false}
          />
        </div>

        {/* Category dropdown */}
        <div className="w-full md:w-1/3">
          <Select
            options={categoryOptions}
            value={categoryOptions.find(
              (option) => option.value === (category ? category.value : "")
            )}
            onChange={setCategory}
            className="text-sm text-gray-800"
            classNamePrefix="react-select"
            placeholder="Select Category"
            isSearchable={false}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md w-full md:w-auto flex items-center justify-center"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </form>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute bg-white text-gray-500 shadow-lg w-full mt-2 rounded-lg p-4">
          Loading...
        </div>
      )}

      {/* Results dropdown */}
      {filteredResults.length > 0 && (
        <ul className="absolute bg-white text-gray-800 shadow-lg w-full mt-2 rounded-lg max-h-60 overflow-y-auto z-10">
          {filteredResults.map((item) => (
            <li
              key={item.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              {item.title || item.name} - {item.type} - {item.location}
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {!loading && filteredResults.length === 0 && keyword.trim() !== "" && (
        <div className="absolute bg-white text-gray-500 shadow-lg w-full mt-2 rounded-lg p-4">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
