import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RentOtherProperties = () => {
  const [propertyListings, setPropertyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const [landResponse, clothesResponse] = await Promise.all([
          axios.get("https://easy-renting-bn.onrender.com/api/lands"),
          axios.get("https://easy-renting-bn.onrender.com/api/clothes"),
        ]);

        const combinedProperties = [
          ...(landResponse.data?.data || []).map((item) => ({ ...item, type: "lands" })),
          ...(clothesResponse.data?.data || []).map((item) => ({ ...item, type: "clothes" })),
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
    return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  return (
    <div className="mt-30 p-4">
      <h1 className="text-2xl font-bold text-gray-800">Other Properties</h1>
      <p className="text-gray-400">Here you can see different properties</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {propertyListings.map((property) => (
          <div key={property._id || property.id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="relative">
              <img
                src={property.image || "https://via.placeholder.com/400"}
                alt={property.name || property.title}
                className="w-full h-48 rounded-t-lg"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-white text-xs font-bold rounded ${
                  property.status === "sold" ? "bg-orange-500" : "bg-green-500"
                }`}
              >
                {property.status ? property.status.toUpperCase() : "N/A"}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-2">{property.name || property.title}</h3>
            <p className="text-green-600 text-xl font-bold">{property.price}</p>
            <div className="flex justify-between items-center mt-4">
              <Link to={`/${property.type}/${property._id || property.id}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentOtherProperties;
