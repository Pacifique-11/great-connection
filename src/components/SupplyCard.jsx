import React from 'react';

const SupplyCard = ({ image, title, description, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <button
          onClick={onClick}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SupplyCard;