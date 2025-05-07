import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/requested-property/${property._id}`); // Navigate to the details page
  };

  return (
	
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {property.image && (
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-lg font-bold text-gray-800">{property.title}</h2>
      <p className="text-gray-600">Price: {property.price}</p>
      <p className="text-gray-600">Location: {property.location}</p>
      <button
        onClick={handleViewDetails}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        View Details
      </button>
	 
	 
    </div>



  );
};

export default PropertyCard;