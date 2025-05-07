import React, { useState } from 'react';
import Hero from "./Home/Hero";
import ApartmentCards from "./Appatment.cards";
import Footer from "./Footer";
import AssetProperty from "./AssetProperty";
import SearchBar from "./Home/SearchBar";
import {NavBar} from "./NavBar";

const Home = () => {
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results) => {
    setFilteredAssets(results.assets);
    setFilteredProperties(results.properties);
    setIsSearching(true);
  };
  return (
    <div className="bg-gray-50 mt-20">
      <NavBar />
      <Hero />
      <SearchBar onSearchResults={handleSearchResults} />
      {isSearching ? (
        <div className="p-6 space-y-6">
          <ApartmentCards properties={filteredProperties} />
          <AssetProperty assets={filteredAssets} />
        </div>
      ) : (
        <>
          <ApartmentCards />
          <AssetProperty />
        </>
      )}
      <Footer />
      </div>
  );
};

export default Home;
