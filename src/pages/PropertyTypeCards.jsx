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

  // Capitalize nicely for UI display (e.g., "car" -> "Car")
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Pass the exact parameter or lowercase version depending on your backend route
        const response = await axios.get(`https://greatconnectionltd.onrender.com/api/get-properties/type/${displayType}`);
        
        // Handle whether backend returns an array directly or nested under an object key
        const fetchedData = Array.isArray(response.data) 
          ? response.data 
          : (response.data.properties || response.data.data || []);
          
        setProperties(fetchedData);
      } catch (err) {
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchProperties();
    }
  }, [type, displayType]);

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <section className="mt-20 bg-gray-100 min-h-screen">
          <header className="px-6 py-6 bg-green-500 text-white shadow-md flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <h2 className="text-2xl font-semibold text-white">{displayType} Property</h2>
          </header>

          {/* Skeleton Grid */}
          <div className="property-container max-w-7xl mx-auto flex flex-wrap gap-6 py-8 px-4 justify-center">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div 
                key={n} 
                className="w-full sm:w-[350px] rounded-2xl overflow-hidden shadow-md p-4 bg-white flex flex-col justify-between animate-pulse"
              >
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-md"></div>

                {/* Content Placeholder */}
                <div className="mt-4 flex-grow space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>

                  {/* Icon Specs Row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>

                  {/* Button Placeholder */}
                  <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
                </div>

                {/* Footer Placeholder */}
                <div className="mt-4 border-t pt-3 flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 text-red-500">{error}</div>
        <Footer />
      </>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 mt-10 text-gray-500">
          <h2 className="capitalize text-2xl text-center font-semibold text-gray-800 mb-4">
            {displayType} Property
          </h2>
          No Properties Found For This Type.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="mt-20 bg-gray-100 min-h-screen">
        <header className="px-6 py-6 bg-green-500 text-white shadow-md flex items-center gap-2">
          <span>Home</span>
          <span>/</span>
          <h2 className="text-2xl font-semibold text-white">{displayType} Property</h2>
        </header>

        <div className="property-container max-w-7xl mx-auto flex flex-wrap gap-6 py-8 px-4 justify-center">
          {properties.map((property) => (
            <div 
              key={property._id} 
              className="w-full sm:w-[350px] rounded-2xl overflow-hidden shadow-lg p-4 bg-white flex flex-col justify-between"
            >
              {/* Image and Status */}
              <div className="relative">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={property.image || 'https://via.placeholder.com/150'}
                  alt={property.title || property.name || 'Property Image'}
                />
                <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
                  {property.status}
                </span>
              </div>

              {/* Property Info */}
              <div className="mt-3 flex-grow">
                <h3 className="text-lg font-bold text-gray-800">
                  {property.price?.toString().startsWith('RWF') ? property.price : `RWF ${property.price}`}
                </h3>
                <h4 className="text-md font-semibold text-gray-700 mt-1">
                  {property.title || property.name}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {property.description?.substring(0, 80) || 'No description'}...
                </p>

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
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer"
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
      </section>
    </>
  );
};

export default PropertyTypeCards;