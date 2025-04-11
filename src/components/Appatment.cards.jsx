import React, { useEffect, useState } from 'react';
import { FaBed, FaBath, FaHeart, FaShare, FaEye } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { useNavigate ,useParams} from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const ApartmentCards = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const {id} = useParams(); // Get the property ID from the URL parameters
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://easy-renting-bn.onrender.com/api/get-properties');
        setProperties(response.data); // Assuming the API returns an array of properties
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`); // Navigate to the PropertyDetail page with the property ID
  };

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center py-6">
      {properties.map((property) => (
        <div key={property._id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-white">
          {/* Property Image and Status */}
          <div className="relative">
            <img
              className="w-full h-48 object-cover rounded-md"
              src={property.image || 'https://via.placeholder.com/150'}
              alt={property.title}
            />
            <span className="absolute inset-0 flex justify-center items-center">
              <span className="bg-black bg-opacity-20 rounded-full p-1">
                <FaEye className="w-3 h-3 text-white cursor-pointer" />
              </span>
            </span>
            <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
              {property.status}
            </span>
            <span className="absolute bottom-2 right-2 flex items-center text-gray-500 px-2 py-1 text-xs rounded gap-2">
              <FaHeart className="w-5 h-5 cursor-pointer" />
              <FaShare className="w-5 h-5 cursor-pointer" />
            </span>
          </div>

          {/* Property Details */}
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

            {/* Navigate to Property Detail Page */}
            <button
              onClick={() => handleViewDetails(property._id)} // Use the handler function
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              View Details
            </button>
          </div>

          {/* Footer Information */}
          <div className="p-4 text-gray-500 text-sm flex justify-between border-t">
            <span>{property.owner}</span>
            <span>{property.timeAgo}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentCards;
