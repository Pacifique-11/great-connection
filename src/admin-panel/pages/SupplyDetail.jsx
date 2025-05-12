import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHome, FaLocationArrow } from "react-icons/fa";
import axiosClient from "../../api/axiosClient";

const SupplyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosClient.get(`/supply-property/${id}`);
        setProperty(res.data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.put(`/supply-property/${id}/approve`);
      setApprovalMessage("Property approved successfully.");
      setProperty({ ...property, status: "approved" });
    } catch (error) {
      console.error("Approval failed:", error);
      setApprovalMessage("Failed to approve property.");
    }
    setLoading(false);
  };

  if (!property) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading property details...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-24 bg-white rounded shadow-sm">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-gray-500 mb-4">
        <FaHome />
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{property.title}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <h2 className="text-xl text-green-700 font-semibold">
          Rwf{property.price}
        </h2>
      </div>

      {/* Status & Location */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full uppercase">
          {property.status}
        </span>
        <div className="flex items-center gap-2 text-gray-600">
          <FaLocationArrow />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Image */}
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-[400px] object-cover rounded-md shadow mb-6"
      />

      {/* Description */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-inner mb-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">
          Description
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-gray-700">
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Owner:</strong> {property.owner}
        </p>
        <p>
          <strong>Contact:</strong> {property.contact}
        </p>
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {property.bathrooms}
        </p>
        <p>
          <strong>Toilets:</strong> {property.toilets}
        </p>
        <p>
          <strong>Area:</strong> {property.area}
        </p>
        <p>
          <strong>Status:</strong> {property.status}
        </p>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Features</h3>
        {property.features && property.features.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside text-gray-700">
            {property.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No features listed for this property.</p>
        )}
      </div>

      {/* Admin Button */}
      <div className="flex gap-4">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Approving..." : "Approve"}
        </button>
        {approvalMessage && (
          <p className="text-sm text-gray-600 mt-2">{approvalMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SupplyDetail;
