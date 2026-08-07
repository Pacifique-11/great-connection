import React, { useState, useEffect, useCallback } from 'react';
import Hero from "./Home/Hero";
import ApartmentCards from "./Home/Appatment.cards";
import Footer from "./Footer";
import AssetProperty from "./Home/AssetProperty";
import SearchBar from "./Home/SearchBar";
import { NavBar } from "./NavBar";

const Home = () => {
  const [defaultProperties, setDefaultProperties] = useState([]);
  const [defaultAssets, setDefaultAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchResults, setSearchResults] = useState(null);

  // Fetch default properties and assets on initial page load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from your render backend endpoints
        const [propRes, assetRes] = await Promise.all([
          fetch('https://greatconnectionltd.onrender.com/api/properties').catch(() => null),
          fetch('https://greatconnectionltd.onrender.com/api/assets').catch(() => null)
        ]);

        if (propRes && propRes.ok) {
          const propData = await propRes.json();
          console.log("Properties API Response:", propData); // Check your browser console to verify structure
          
          // Handles flat arrays, or objects like { data: [...] } or { properties: [...] }
          const extractedProps = Array.isArray(propData) 
            ? propData 
            : propData.properties || propData.data || propData.items || [];
          setDefaultProperties(extractedProps);
        }

        if (assetRes && assetRes.ok) {
          const assetData = await assetRes.json();
          console.log("Assets API Response:", assetData); // Check your browser console to verify structure
          
          const extractedAssets = Array.isArray(assetData) 
            ? assetData 
            : assetData.assets || assetData.data || assetData.items || [];
          setDefaultAssets(extractedAssets);
        }
      } catch (error) {
        console.error('Failed to fetch initial home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  // Determine what to display
  let displayedProperties = defaultProperties;
  let displayedAssets = defaultAssets;

  if (searchResults !== null) {
    if (Array.isArray(searchResults)) {
      // If search returns a flat array, map it appropriately or put in properties
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