import React from "react";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../SkeletonCard"; 

const AssetProperty = ({ assets = [], isLoading = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight text-center">
          Other Properties & Assets
        </h2>
        <div className="w-16 h-1 bg-green-600 rounded-full mt-2" />
      </div>

      {isLoading ? (
        // Display 3 skeleton cards while loading data (reusable anywhere)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <SkeletonCard count={3} />
        </div>
      ) : assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <svg 
            className="w-12 h-12 text-gray-400 mb-3" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-500 text-base font-medium">No assets available for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {assets.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-video bg-gray-100">
                <img
                  src={item.image || "https://via.placeholder.com/400x300?text=No+Image+Available"}
                  alt={item.name || "Asset Image"}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item.status && (
                  <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.status}
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1 mb-1">
                  {item.name}
                </h3>
                
                <p className="text-green-600 font-bold text-base mb-3">
                  {typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : item.price}
                </p>

                <div className="space-y-1.5 text-sm text-gray-600 mb-6 flex-grow">
                  {item.owner && (
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Owner:</span> {item.owner}
                    </p>
                  )}
                  {item.location && (
                    <p className="flex items-center gap-2 truncate">
                      <span className="font-medium text-gray-700">Location:</span> {item.location}
                    </p>
                  )}
                  {item.contact && (
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">Contact:</span> {item.contact}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => handleViewDetails(item._id || item.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm"
                  >
                    View Details
                  </button>

                  {item.timeAgo && (
                    <span className="text-xs text-gray-400 text-right mt-1">
                      Posted {item.timeAgo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AssetProperty;