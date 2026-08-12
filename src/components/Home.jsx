import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Hero from "./Home/Hero";
import ApartmentCards from "./Home/Appatment.cards";
import Footer from "./Footer";
import AssetProperty from "./Home/AssetProperty";
import SearchBar from "./Home/SearchBar";
import { NavBar } from "./NavBar";

// Fetcher functions for TanStack Query
const fetchProperties = async () => {
  const res = await fetch('https://greatconnectionltd.onrender.com/api/properties');
  if (!res.ok) throw new Error('Failed to fetch properties');
  const propData = await res.json();
  return Array.isArray(propData) ? propData : propData.properties || propData.data || propData.items || [];
};

const fetchAssets = async () => {
  const res = await fetch('https://greatconnectionltd.onrender.com/api/assets');
  if (!res.ok) throw new Error('Failed to fetch assets');
  const assetData = await res.json();
  return Array.isArray(assetData) ? assetData : assetData.assets || assetData.data || assetData.items || [];
};

const Home = () => {
  const [searchResults, setSearchResults] = useState(null);

  // Keep-alive ping on mount and every 10 minutes to prevent Render spin-down
  useEffect(() => {
    const pingServer = async () => {
      try {
        await fetch('https://greatconnectionltd.onrender.com/api/assets', { method: 'HEAD' });
      } catch (error) {
        // Suppress network errors during cold starts
      }
    };
    pingServer();
    const interval = setInterval(pingServer, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Use TanStack Query for properties with caching
  const { data: defaultProperties = [], isLoading: isPropsLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  // Use TanStack Query for assets with caching
  const { data: defaultAssets = [], isLoading: isAssetsLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  const isLoading = isPropsLoading || isAssetsLoading;

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  // Determine what to display based on search state
  let displayedProperties = defaultProperties;
  let displayedAssets = defaultAssets;

  if (searchResults !== null) {
    if (Array.isArray(searchResults)) {
      displayedProperties = searchResults;
      displayedAssets = [];
    } else {
      displayedProperties = searchResults.properties || searchResults.data || [];
      displayedAssets = searchResults.assets || [];
    }
  }

  return (
    <div className="bg-gray-50 mt-20">
      <NavBar />
      <Hero />
      <SearchBar onSearchResults={handleSearchResults} />

      {searchResults !== null && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h3 className="text-xl font-bold text-gray-800">Search Results</h3>
        </div>
      )}

      <div className="p-6 space-y-6">
        <ApartmentCards properties={displayedProperties} isLoading={isLoading} />
        <AssetProperty assets={displayedAssets} isLoading={isLoading} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;