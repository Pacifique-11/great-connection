import React from 'react';
import { useState, useEffect } from 'react';
import { FaSearch} from 'react-icons/fa';

function SearchBar({ onSearchResults }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(`https://easy-renting-bn.onrender.com/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      onSearchResults(data);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="relative border-2 border-gray-400  py-1 px-2 w-[320px] sm:max-w-1/2 lg:max-w-1/3 mx-auto  flex justify-center items-center bg-gray-100 rounded-lg shadow-md mx-2 my-4">
      <input
        type="text"
        placeholder="Search properties or assets..."
        className="border p-2 rounded w-full outline-none border-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
       <FaSearch className="absolute right-4 text-gray-500" />


     
    </div>
  );
}

export default SearchBar;