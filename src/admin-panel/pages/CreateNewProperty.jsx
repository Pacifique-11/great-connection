// src/admin-panel/pages/Dashboard.jsx
import React, { useState } from "react";
import MainLayout from "../../admin-panel/components/MainLayout";

import PropertyForm from "../../admin-panel/components/PropertyForm";

export default function Dashboard() {
  const [editingProperty, setEditingProperty] = useState(null);
    const [ResponseMessage, setResponseMessage] = useState(null);
  const handleFormSubmit = () => {
    setEditingProperty(null);
    setResponseMessage("Property created successfully!");
    setTimeout(() => {
      setResponseMessage(null);
    }, 3000); 
  };

  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Create New Property</h2>
        <p className="text-gray-600 mb-4">Fill in the details below to create a new property listing.</p>
      {/* Property Form */}
      <div className="my-6">
        <PropertyForm onCreated={handleFormSubmit} editingProperty={editingProperty} />

        <p className="sucees-message mt-4 text-green-600 text-center">{ResponseMessage}</p>
      </div>
    </MainLayout>
  );
}
