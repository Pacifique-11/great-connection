// admin-panel/components/PropertyCard.jsx
import React from 'react';
export default function PropertyCard({ property, onView }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-1/2 lg:w-[400px] m-2">
      <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="font-semibold text-xl">{property.title}</h2>
        <p className="text-sm text-gray-600">{property.location}</p>
        <p className="text-gray-700 text-sm mt-1">{property.description.slice(0, 60)}...</p>
        <p className="font-semibold text-green-600 mt-2">Price:Rwf{property.price}</p>
        <div className="text-sm text-gray-500 mt-1">Status: {property.status}</div>

<div className="flex flex-wrap justify-center mt-4 space-x-2">
  <button 
    onClick={() => onView(property)} 
    title="View"
    className="text-center text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md p-2 w-auto mt-2 cursor-pointer">
    <span className="hidden sm:inline">View Detail</span>
  </button>


</div>

      </div>
    </div>
  );
}
