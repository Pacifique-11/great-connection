import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SupplyCard from './SupplyCard';
import axios from 'axios';

const SupplyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://easy-renting-bn.onrender.com/api/supply-property');
		console.assert(response.data, 'API Response:', response.data); // Log the API response for debugging
		setProperties(response.data.data); // Assuming the API returns an array of properties
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/supply-property-detail/${id}`); // Navigate to the SupplyDetail component with the ID
  };

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplied  Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <SupplyCard
            key={property._id}
            image={property.image} // Assuming the API provides an `image` field
            title={property.title} // Assuming the API provides a `title` field
            description={property.description} // Assuming the API provides a `description` field
            onClick={() => handleViewDetails(property._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupplyProperty;