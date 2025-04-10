import React, { useState, useEffect } from "react";
import { FaBed, FaBath, FaHeart, FaShare, FaEye } from "react-icons/fa";
import { MdCropSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const BuyApartment = () => {
  const [properties, setProperties] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://easy-renting-bn.onrender.com/api/get-properties"); 
        setProperties(response.data); 
      } catch (err) {
        console.error("Error fetching property data:", err);
        setError("Failed to load property data. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center py-6 mt-20">
      {properties.map((property) => (
        <div key={property.id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-white">
          
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-md"
              src={property.image || "https://via.placeholder.com/400"}
              alt={property.title || "Property Image"}
            />
            <span className="absolute inset-0 flex justify-center items-center">
              <span className="bg-black bg-opacity-20 rounded-full p-1">
                <FaEye className="w-3 h-3 text-white cursor-pointer" />
              </span>
            </span>
            <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
              {property.status || "N/A"}
            </span>
            <span className="absolute bottom-2 right-2 flex items-center text-gray-500 px-2 py-1 text-xs rounded gap-2">
              <FaHeart className="w-5 h-5 cursor-pointer" />
              <FaShare className="w-5 h-5 cursor-pointer" />
            </span>
          </div>

          
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mt-1">{property.price || "N/A"}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {property.description ? property.description.substring(0, 80) : "No description available"}...
            </p>

            <div className="flex items-center space-x-4 mt-3 text-gray-600">
              <div className="flex items-center space-x-1">
                <FaBed /> <span>{property.bedrooms || 0} Beds</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaBath /> <span>{property.bathrooms || 0} Baths</span>
              </div>
              <div className="flex items-center space-x-1">
                <MdCropSquare /> <span>{property.area || "N/A"}</span>
              </div>
            </div>

            
            <Link to={`/property/${property.id}`}>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer">
                View Details
              </button>
            </Link>
          </div>

          
          <div className="p-4 text-gray-500 text-sm flex justify-between border-t">
            <span>{property.owner || "Unknown Owner"}</span>
            <span>{property.timeAgo || "N/A"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyApartment;