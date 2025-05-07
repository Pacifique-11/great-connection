import React, { useEffect, useState } from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { NavBar } from '../components/NavBar';

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

  if (properties.length === 0) {
    return (
      <>
      <NavBar />
      <div className="text-center py-10 mt-30 text-gray-500">
        <h2 className="capitalize text-2xl text-center font-semibold text-gray-800 mb-4">{displayType} Property</h2>
        No Properties Found For This Type.
        
      </div>
      <Footer />
      </>
      
    );
  }

  return (
    <>
    <NavBar />
    <div className="mt-30 bg-gray-100">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">{displayType} Property</h2>
      <div className="property-container flex flex-wrap gap-6 py-6 mx-auto">
        {properties.map((property) => (
          <div key={property._id} className="rounded-2xl overflow-hidden shadow-lg p-4 bg-white flex flex-col justify-between">
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
            <div className="mt-3">
              <h3 className="text-lg font-bold text-gray-800">RWF {property.price}</h3>
              <p className="text-gray-600 text-sm mt-1">{property.description?.substring(0, 80) || 'No description'}...</p>

              <div className="flex items-center justify-between mt-3 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <FaBed /> <span>{property.bedrooms || 0} Beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaBath /> <span>{property.bathrooms || 0} Baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdCropSquare /> <span>{property.area || 'N/A'}</span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(property._id)}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                View Details
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 text-gray-500 text-sm flex justify-between border-t pt-2">
              <span>{property.owner || 'Unknown'}</span>
              <span>{property.timeAgo || 'Recently'}</span>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
    </>
    
  );
};

export default PropertyTypeCards;
