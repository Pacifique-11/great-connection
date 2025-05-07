import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToRequestedProperties = () => {
    navigate("/admin/requested-properties");
  };

  const handleNavigateToSuppliedProperties = () => {
    navigate("/admin/supply-properties");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
      <p className="text-center mb-6">Manage your properties and assets here.</p>

      <div className="flex space-x-4">
        <button
          onClick={handleNavigateToRequestedProperties}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Requested Properties
        </button>
        <button
          onClick={handleNavigateToSuppliedProperties}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Supplied Properties
        </button>
      </div>
    </div>
  );
};

export default Dashboard;