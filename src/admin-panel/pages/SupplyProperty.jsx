import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplyCard from '../components/SupplyCard';
import axiosClient from '../../api/axiosClient';
import MainLayout from '../components/MainLayout';

const SupplyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosClient.get('/supply-property');
        setProperties(response.data.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (property) => {
    navigate(`/admin-panel/supplied-property/${property._id}`);
  };

  const handleDeleteProperty = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      await axiosClient.delete(`/supply-property/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete the property.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading properties...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <MainLayout>
    <div className="container mx-auto mt-6 px-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplied Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <SupplyCard
            key={property._id}
            supply={property}
            onView={handleViewDetails}
            onDelete={handleDeleteProperty}
          />
        ))}
      </div>
    </div>
    </MainLayout>
  );
};

export default SupplyProperty;
