import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestedProperties = () => {
  const [requestedProperties, setRequestedProperties] = useState([]); // State to store requested properties
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const fetchRequestedProperties = async () => {
      try {
        const response = await axios.get("https://easy-renting-bn.onrender.com/api/request-property"); // Replace with your API endpoint
        console.log("API Response:", response.data.data);
        setRequestedProperties(response.data.data); // Update state with fetched data
      } catch (err) {
        console.error("Error fetching requested properties:", err);
        setError("Failed to fetch requested properties. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRequestedProperties();
  }, []);

  if (loading) {
    return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  if (!Array.isArray(requestedProperties) || requestedProperties.length === 0) {
    return <h2 className="text-center text-gray-500 mt-10">No requested properties found.</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Requested Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requestedProperties.map((property) => (
          <div key={property._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-800">{property.title}</h2>
            <p className="text-gray-600">Price: {property.price}</p>
            <p className="text-gray-600">Status: {property.status || "N/A"}</p>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">Bedrooms: {property.bedrooms || "N/A"}</p>
            <p className="text-gray-600">Bathrooms: {property.bathrooms || "N/A"}</p>
            <p className="text-gray-600">Toilets: {property.toilets || "N/A"}</p>
            <p className="text-gray-600">Area: {property.area || "N/A"} sqm</p>
            <p className="text-gray-600">Type: {property.type || "N/A"}</p>
            <p className="text-gray-600">Features: {property.features || "N/A"}</p>
            <p className="text-gray-600">Requester: {property.requesterName || "N/A"}</p>
            <p className="text-gray-600">Contact: {property.contact || "N/A"}</p>
            <p className="text-gray-600">Description: {property.description || "N/A"}</p>
            {property.image && (
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover mt-4 rounded-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestedProperties;