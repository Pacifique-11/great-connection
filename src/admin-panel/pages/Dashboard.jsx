// src/admin-panel/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import DashboardWidgets from "../components/DashboardWidgets";
import QuickActions from "../components/QuickActions";
import axiosClient from "../../api/axiosClient";
import PropertyCard from "../components/PropertyCard";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setViewingProperty] = useState(null);
  const [, setEditingProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosClient.get("/get-properties");
      
      // Safely handle data format (whether array or wrapped in an object)
      const data = Array.isArray(res.data) 
        ? res.data 
        : (res.data.properties || res.data.data || []);
        
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to fetch dashboard properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || user.role !== "admin") {
      alert("Only admins can delete requested properties.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axiosClient.delete(`/delete-property/${id}`);
      fetchProperties();
    } catch (err) {
      console.error("Error deleting property:", err);
      alert("Failed to delete the property. Please try again.");
    }
  };

  const handleEdit = (property) => setEditingProperty(property);
  const handleView = (property) => setViewingProperty(property);

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    fetchProperties();
  }, []);

  const adminUser = localStorage.getItem("user");
  const user = adminUser ? JSON.parse(adminUser) : null;
  const adminName = user?.username || "Admin";

  return (
    <MainLayout>
      {/* Welcome Banner */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {adminName}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">Here is an overview of your platform statistics and listings.</p>
      </header>

      {/* Widgets & Actions */}
      <section className="space-y-6">
        <DashboardWidgets />
        <QuickActions />
      </section>

      {/* Property Cards Section */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">All Properties</h3>
          <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
            Total: {properties.length}
          </span>
        </div>

        {loading ? (
          /* Skeleton Loading */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-xl shadow-sm p-4 h-64 flex flex-col justify-between border border-gray-100">
                <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 text-red-500 font-medium">
            {error}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-700">No Properties Found</h4>
            <p className="text-sm text-gray-400 mt-1">There are currently no properties listed on the dashboard.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num + 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === num + 1
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {num + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </MainLayout>
  );
}