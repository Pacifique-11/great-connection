import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const RequestedPropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`https://easy-renting-bn.onrender.com/api/request-property/${id}`);
        const data = response.data.data;
        setProperty(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  if (!property) {
    return <h2 className="text-center text-gray-500 mt-10">Property not found.</h2>;
  }

  return (
    <>
    <UserNavbar />
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title || "Untitled Property"}</h1>

        {property.image ? (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md mb-6 text-gray-400">
            No image available
          </div>
        )}

        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-semibold">Price:</span> {property.price || "N/A"}</p>
          <p className="text-gray-700"><span className="font-semibold">Location:</span> {property.location || "N/A"}</p>
          <p className="text-gray-700"><span className="font-semibold">Description:</span> {property.description || "No description provided."}</p>
          <p className="text-gray-700"><span className="font-semibold">Requester:</span> {property.requesterName || "N/A"}</p>
          <p className="text-gray-700"><span className="font-semibold">Contact:</span> {property.contact || "N/A"}</p>
        </div>
      </div>
    </>
  );
};

export default RequestedPropertyDetail;
