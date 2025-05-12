import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import RequestPropertyCard from "../components/RequestPropertyCard";
import MainLayout from "../components/MainLayout";
import { useNavigate } from "react-router-dom";

export default function RequestedProperties() {
  const [requestedProperties, setRequestedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestedProperties = async () => {
      try {
        const response = await axiosClient.get("/request-property");
        setRequestedProperties(response.data.data);
      } catch (err) {
        console.error("Error fetching requested properties:", err);
        setError("Failed to fetch requested properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequestedProperties();
  }, []);

  // Optional custom handler, can remove if not needed
  const handleView = (property) => {
    navigate(`/admin-panel/requested-property/${property._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/request-property/${id}`);
      setRequestedProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting property request:", err);
      alert("Failed to delete property request.");
    }
  };

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
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Requested Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestedProperties.map((property) => (
            <RequestPropertyCard
              key={property._id}
              property={property}
              onView={handleView}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
