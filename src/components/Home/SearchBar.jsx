import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearchResults }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(`https://greatconnectionltd.onrender.com/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      onSearchResults(data);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto my-6 px-4">
      <div className="relative flex items-center bg-white border border-gray-200 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 rounded-2xl shadow-sm transition-all duration-200 px-4 py-2.5">
        <input
          type="text"
          placeholder="Search properties or assets..."
          className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm sm:text-base pr-10 py-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute right-6 flex items-center pointer-events-none text-gray-400">
          <FaSearch className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;