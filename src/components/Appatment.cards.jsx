import React from 'react';
import { FaBed, FaBath, FaHeart, FaShare, FaEye } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Properties from '../assets/property';

const ApartmentCards = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-6">
      {Properties.map((property) => (
        <div key={property.id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-white">
          {/* Property Image and Status */}
          <div className="relative">
            <img className="w-full h-48 object-cover rounded-md" src={property.image} alt={property.title} />
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
            <h3 className="text-lg font-bold text-gray-800 mt-1">{property.price}</h3>
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
            <Link to={`/property/${property.id}`}>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer">
                View Details
              </button>
            </Link>
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
