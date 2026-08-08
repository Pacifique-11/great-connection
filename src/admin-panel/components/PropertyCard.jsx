// admin-panel/components/PropertyCard.jsx
import React from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

export default function PropertyCard({ property, onEdit, onDelete, onView }) {
  // Fallbacks for safe rendering
  const title = property.title || property.name || 'Untitled Property';
  const location = property.location || 'Location not specified';
  const description = property.description 
    ? (property.description.length > 60 ? property.description.slice(0, 60) + '...' : property.description)
    : 'No description available.';
  const price = property.price 
    ? (property.price.toString().startsWith('RWF') || property.price.toString().startsWith('RwF') ? property.price : `RWF ${property.price}`)
    : 'N/A';
  const status = property.status ? property.status.toUpperCase() : 'AVAILABLE';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col justify-between border border-gray-100 w-full">
      <div>
        {/* Property Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img 
            src={property.image || "https://via.placeholder.com/400"} 
            alt={title} 
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" 
          />
          <span className={`absolute top-2 right-2 px-2.5 py-1 text-white text-xs font-semibold rounded-md shadow-sm ${
            status === "SOLD" ? "bg-orange-500" : "bg-green-500"
          }`}>
            {status}
          </span>
        </div>

        {/* Content Area */}
        <div className="p-5">
          <h2 className="font-bold text-lg text-gray-800 truncate" title={title}>{title}</h2>
          <p className="text-sm text-gray-500 mt-0.5 truncate">{location}</p>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="font-extrabold text-green-600 text-lg">{price}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 pt-0">
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
          <button 
            onClick={() => onView(property)} 
            title="View Details"
            className="flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg py-2 px-2 transition-colors cursor-pointer text-sm font-medium"
          >
            <FiEye className="mr-1.5" />
            <span>View</span>
          </button>

          <button 
            onClick={() => onEdit(property)} 
            title="Edit Property"
            className="flex items-center justify-center text-green-600 bg-green-50 hover:bg-green-100 rounded-lg py-2 px-2 transition-colors cursor-pointer text-sm font-medium"
          >
            <FiEdit className="mr-1.5" />
            <span>Edit</span>
          </button>

          <button 
            onClick={() => onDelete(property._id || property.id)} 
            title="Delete Property"
            className="flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-100 rounded-lg py-2 px-2 transition-colors cursor-pointer text-sm font-medium"
          >
            <FiTrash2 className="mr-1.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}