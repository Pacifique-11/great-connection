import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BuyOtherProperties = () => {
  const [propertyListings, setPropertyListings] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const [landResponse, clothesResponse] = await Promise.all([
          axios.get("https://greatconnectionltd.onrender.com/api/lands"), 
          axios.get("https://greatconnectionltd.onrender.com/api/clothes"), 
        ]);

        // Safely extract arrays whether they are root arrays or nested under .data
        const lands = Array.isArray(landResponse.data) 
          ? landResponse.data 
          : (landResponse.data?.data || landResponse.data?.lands || []);

        const clothes = Array.isArray(clothesResponse.data) 
          ? clothesResponse.data 
          : (clothesResponse.data?.data || clothesResponse.data?.clothes || []);

        const combinedProperties = [
          ...lands.map((item) => ({ ...item, type: "lands" })), 
          ...clothes.map((item) => ({ ...item, type: "clothes" })), 
        ];

        setPropertyListings(combinedProperties); 
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-28 mb-16 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between">
              <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <h2 className="text-center text-red-500 py-20 font-medium">{error}</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-28 mb-16">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Other Properties</h1>
        <p className="text-gray-500 text-sm mt-1">Here you can see different properties and assets available to buy</p>
      </header>

      {propertyListings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm max-w-lg mx-auto">
          <h3 className="text-xl font-semibold text-gray-700">No Properties Found</h3>
          <p className="text-gray-500 text-sm mt-2">There are no additional properties available right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertyListings.map((property) => (
            <div 
              key={property._id || property.id} 
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl p-4 flex flex-col justify-between border border-gray-100"
            >
              <div>
                <div className="relative">
                  <img
                    src={property.image || "https://via.placeholder.com/400"}
                    alt={property.name || property.title || "Property image"}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <span
                    className={`absolute top-2 right-2 px-2.5 py-1 text-white text-xs font-semibold rounded-md shadow-sm ${
                      property.status?.toLowerCase() === "sold" ? "bg-orange-500" : "bg-green-500"
                    }`}
                  >
                    {property.status ? property.status.toUpperCase() : "AVAILABLE"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-2 truncate">
                  {property.name || property.title}
                </h3>
                <p className="text-green-600 text-xl font-extrabold mt-1">
                  {property.price?.toString().startsWith('RWF') || property.price?.toString().startsWith('RwF')
                    ? property.price 
                    : `RWF ${property.price}`}
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-green-500 transition-colors p-1" title="Save">♡</button>
                  <button className="text-gray-400 hover:text-green-500 transition-colors p-1" title="Share">🔗</button>
                </div>
                <Link to={`/${property.type}/${property._id || property.id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyOtherProperties;