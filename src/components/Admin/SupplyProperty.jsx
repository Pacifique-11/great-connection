import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SupplyCard from './SupplyCard';
import axios from 'axios';

const SupplyProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://easy-renting-bn.onrender.com/api/supply-property');
		console.assert(response.data, 'API Response:', response.data); 
		setProperties(response.data.data); 
      } catch (err) {
        console.error("Error fetching properties:", err); // Log the error
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/supply-property-detail/${id}`); 
  };

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-40 px-6  mb-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Supplied  Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <SupplyCard
            key={property._id}
            image={property.image} 
            title={property.title}
            description={property.description} 
            onClick={() => handleViewDetails(property._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupplyProperty;