import React from 'react';
import { FaBed, FaBath, FaHeart,FaShare } from 'react-icons/fa';
import { MdCropSquare } from 'react-icons/md'; 
import Properties from '../../data/Property';


const ApartmentCards = () => {
	return (
	  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-40">
		{Properties.map((property) => (
		  <div key={property.id} className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 bg-white">
			<div className="relative">
			  <img className="w-full h-48 object-cover rounded" src={property.image} alt="Property" />
			  <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
				FOR RENT
			  </span>
			  <span className="absolute bottom-2 right-2 flex items-center text-white bg-blue-500 px-2 py-1 text-xs rounded gap-2">
				<FaHeart className="w-5 h-5" />
				<FaShare className="w-5 h-5" />
			  </span>
			</div>
			<div className="p-4">
			  <h2 className="text-xl font-semibold text-gray-800">{property.price}</h2>
			  <p className="text-gray-600 text-sm mt-1">{property.description}</p>
			  <div className="flex items-center space-x-4 mt-3 text-gray-600">
				<div className="flex items-center space-x-1">
				  <FaBed /> <span>{property.bedrooms}</span>
				</div>
				<div className="flex items-center space-x-1">
				  <FaBath /> <span>{property.bathrooms}</span>
				</div>
				<div className="flex items-center space-x-1">
				  <MdCropSquare /> <span>{property.area}</span>
				</div>
			  </div>
			  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
				Details
			  </button>
			</div>
			<div className="p-4 text-gray-500 text-sm flex justify-between border-t">
			  <span>{property.type}</span>
			  <span>{property.timeAgo}</span>
			</div>
		  </div>
		))}
	  </div>
	);
  };

export default ApartmentCards;
