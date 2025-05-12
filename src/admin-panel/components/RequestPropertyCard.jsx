import React from "react";
import { useNavigate } from "react-router-dom";

const RequestPropertyCard = ({ property, onView, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onView) {
      onView(property); // Use custom handler
    } else {
      navigate(`/admin-panel/requested-property/${property._id}`); 
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
      {property.image && (
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <div className="flex-grow">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{property.title}</h2>
        <p className="text-gray-600 mb-1">Price: Rwf{property.price}</p>
        <p className="text-gray-600">Location: {property.location}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={handleViewDetails}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(property._id)}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Request
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestPropertyCard;
