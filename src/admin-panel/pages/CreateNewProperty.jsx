import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../admin-panel/components/MainLayout";
import PropertyForm from "../../admin-panel/components/PropertyForm";
import axiosClient from "../../api/axiosClient";

export default function CreateNewProperty() {
  const { id } = useParams(); // Catch property ID if editing via URL parameter
  const navigate = useNavigate();

  const [editingProperty, setEditingProperty] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));

  // If an ID exists in the route, fetch the property data for editing
  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          const res = await axiosClient.get(`/get-property/${id}`); // Adjust endpoint if your backend route differs
          const propertyData = res.data.property || res.data;
          setEditingProperty(propertyData);
        } catch (err) {
          console.error("Error fetching property for edit:", err);
          setResponseMessage("Failed to load property details for editing.");
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  const handleFormSubmit = () => {
    const isEdit = Boolean(editingProperty || id);
    setEditingProperty(null);
    setResponseMessage(
      isEdit ? "Property updated successfully!" : "Property created successfully!"
    );

    setTimeout(() => {
      setResponseMessage(null);
      if (isEdit) {
        navigate("/admin-panel/properties"); // Redirect back to list after editing
      }
    }, 2000);
  };

  const handleCancelEdit = () => {
    if (id) {
      navigate("/admin-panel/properties");
    } else {
      setEditingProperty(null);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 font-medium">Loading property data...</p>
        </div>
      </MainLayout>
    );
  }

  const isEditingMode = Boolean(editingProperty || id);

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">
        {isEditingMode ? "Edit Property Listing" : "Create New Property"}
      </h2>
      <p className="text-gray-600 mb-4">
        {isEditingMode
          ? "Modify the details below to update your property listing."
          : "Fill in the details below to create a new property listing."}
      </p>

      {/* Property Form */}
      <div className="my-6">
        <PropertyForm 
          onCreated={handleFormSubmit} 
          editingProperty={editingProperty} 
          onCancelEdit={handleCancelEdit}
        />

        {responseMessage && (
          <p className="success-message mt-4 text-green-600 text-center font-semibold">
            {responseMessage}
          </p>
        )}
      </div>
    </MainLayout>
  );
}