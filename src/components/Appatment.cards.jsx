import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const ApartmentCards = (properties ) => {
  const property = (properties.properties || []).slice(0, 6);
  const navigate = useNavigate();
  
  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };
  if (property.length == 0) {
    return <div className="text-center py-4 text-gray-500">No properties found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      {property.map((property) => (
        <div key={property._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5">
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
