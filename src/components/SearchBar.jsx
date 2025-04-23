import React, { useState, useEffect } from 'react';
import AssetPropertyList from './AssetPropertyList';
import PropertyList from './PropertyList';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ assets: [], properties: [] });

  useEffect(() => {
    const fetchResults = async () => {
      const res = await fetch(`https://easy-renting-bn.onrender.com/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-6 space-y-4">
      <input
        type="text"
        placeholder="Search properties or assets..."
        className="border p-2 rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <AssetPropertyList assets={results.assets} />
      <PropertyList properties={results.properties} />
    </div>
  );
}

export default SearchBar;
