import React, { useEffect, useState } from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyTypeCards = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { type } = useParams();
  const navigate = useNavigate();

  const displayType = type.charAt(0).toUpperCase() + type.slice(1); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`https://easy-renting-bn.onrender.com/api/get-properties/type/${displayType}`);
        setProperties(response.data.properties);
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [displayType]);

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading {displayType} properties...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center py-6 mt-10 mb-6 bg-gray-100">
      {properties.map((property) => (
        <div key={property._id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-white">
          {/* Image and Status */}
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-md"
              src={property.image || 'https://via.placeholder.com/150'}
              alt={property.title}
            />
            <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
              {property.status}
            </span>
          </div>

          {/* Property Info */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mt-1">RWF {property.price}</h3>
            <p className="text-gray-600 text-sm mt-1">{property.description.substring(0, 80)}...</p>

            <div className="flex items-center space-x-4 mt-3 text-gray-600">
              <div className="flex items-center space-x-1">
                <FaBed /> <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaBath /> <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center space-x-1">
                <MdCropSquare /> <span>{property.area}</span>
              </div>
            </div>

            <button
              onClick={() => handleViewDetails(property._id)}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              View Details
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 text-gray-500 text-sm flex justify-between border-t">
            <span>{property.owner}</span>
            <span>{property.timeAgo}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyTypeCards;