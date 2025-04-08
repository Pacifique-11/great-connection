import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBed, FaBath, FaHeart, FaShare } from "react-icons/fa";
import { MdCropSquare } from "react-icons/md";

const SuppliedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliedProperties = async () => {
      try {
        const res = await axios.get("https://easy-renting-bn.onrender.com/api/get-all-property", {
          headers: { "Content-Type": "application/json" },
        });
        setProperties(res.data.data);
      } catch (error) {
        console.error("Failed to fetch supplied properties:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliedProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-40">
      <h2 className="text-2xl font-bold mb-6 text-center">Supplied Properties</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-white">
              <div className="relative">
                <img
                  className="w-full h-48 object-cover rounded"
                  src={property.image || "/house2.jpg"}
                  alt="Property"
                />
                <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
                  {property.status || "FOR RENT"}
                </span>
                <span className="absolute bottom-2 right-2 flex items-center text-white bg-blue-500 px-2 py-1 text-xs rounded gap-2">
                  <FaHeart className="w-5 h-5" />
                  <FaShare className="w-5 h-5" />
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Rwf {Number(property.price).toLocaleString()}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{property.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <FaBed /> <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaBath /> <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MdCropSquare /> <span>{property.area} sqm</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                  Details
                </button>
              </div>
              <div className="p-4 text-gray-500 text-sm flex justify-between border-t">
                <span>{property.type}</span>
                <span>{property.timeAgo || "Recently"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuppliedProperties;
