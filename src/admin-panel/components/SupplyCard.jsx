import React, { useState } from 'react';
import { FiTrash2, FiEye, FiHeart } from 'react-icons/fi';

const SupplyCard = ({ supply, onView, onDelete }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between">
      <img
        src={supply.image}
        alt={supply.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{supply.title}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{supply.description}</p>
        </div>

        <div className="mt-4 flex justify-between items-center gap-2">
          <button
            onClick={() => onView(supply)}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            <FiEye /> View
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              liked
                ? 'bg-pink-100 text-pink-600'
                : 'bg-gray-100 text-gray-600'
            } hover:bg-pink-200`}
          >
            <FiHeart /> {liked ? 'Liked' : 'Like'}
          </button>

          <button
            onClick={() => onDelete(supply._id)}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplyCard;
