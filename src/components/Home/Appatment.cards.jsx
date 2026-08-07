import React from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import SkeletonCard from '../SkeletonCard'; 

const ApartmentCards = ({ properties = [], isLoading = false }) => {
  const navigate = useNavigate();
  const propertyList = (properties || []).slice(0, 6);

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        <SkeletonCard count={3} />
      </div>
    );
  }

  if (propertyList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300 mb-20">
        <svg 
          className="w-12 h-12 text-gray-400 mb-3" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <p className="text-gray-500 text-base font-medium">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
      {propertyList.map((item) => (
        <div 
          key={item._id || item.id} 
          className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden group"
        >
          {/* Image & Status Badge */}
          <div className="relative overflow-hidden aspect-video bg-gray-100">
            <img
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={item.title || 'Property Image'}
              loading="lazy"
            />
            {item.status && (
              <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider">
                {item.status}
              </span>
            )}
          </div>

          {/* Body Content */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mt-1">
              RWF {typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
            </h3>
            
            <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
              {item.description ? `${item.description.substring(0, 80)}...` : 'No description provided.'}
            </p>

            {/* Property Specs (Beds, Baths, Area) */}
            <div className="flex items-center justify-between mt-4 py-3 px-3 bg-gray-50 rounded-xl text-gray-600 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <FaBed className="text-blue-600" /> <span>{item.bedrooms || 0} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaBath className="text-blue-600" /> <span>{item.bathrooms || 0} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MdCropSquare className="text-blue-600" /> <span>{item.area || 'N/A'}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleViewDetails(item._id || item.id)}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center text-sm cursor-pointer"
            >
              View Details
            </button>
          </div>

          {/* Footer Metadata */}
          <div className="px-5 py-3 bg-gray-50 text-gray-500 text-xs flex justify-between items-center border-t border-gray-100 mt-auto">
            <span className="font-medium text-gray-700 truncate max-w-[50%]">{item.owner || 'Verified Agent'}</span>
            <span>{item.timeAgo || 'Recently added'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentCards;