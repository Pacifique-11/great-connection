import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import MainLayout from "../components/MainLayout";

const RequestedPropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        console.log("Fetching property with ID:", id); // Debugging log
        const response = await axiosClient.get(`/request-property/${id}`);
        console.log("API Response:", response.data); // Debugging log
        setProperty(response.data);
      } catch (err) {
        console.error("Error fetching property details:", err); // Debugging log
        setError(err.response?.data?.message || "Failed to fetch property details. Please try again later.");
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
    <MainLayout>
      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{property.title}</h1>
        {property.image && (
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-gray-600">Price:Rwf{property.price}</p>
        <p className="text-gray-600">Location: {property.location}</p>
        <p className="text-gray-600">Description: {property.description}</p>
        <p className="text-gray-600">Requester: {property.requesterName}</p>
        <p className="text-gray-600">Contact: {property.contact}</p>
      </div>
    </MainLayout>
  );
};

export default RequestedPropertyDetail;