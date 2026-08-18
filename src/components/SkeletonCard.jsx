import React from "react";

export const SkeletonCard = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col overflow-hidden animate-pulse"
        >
          {/* Skeleton Image Box */}
          <div className="w-full aspect-video bg-gray-200 rounded-xl mb-4" />

          {/* Skeleton Content */}
          <div className="space-y-3 flex-grow">
            {/* Title */}
            <div className="h-5 bg-gray-200 rounded-md w-3/4" />
            
            {/* Price */}
            <div className="h-4 bg-gray-200 rounded-md w-1/3" />

            {/* Meta text lines */}
            <div className="space-y-2 pt-2">
              <div className="h-3.5 bg-gray-200 rounded-md w-full" />
              <div className="h-3.5 bg-gray-200 rounded-md w-5/6" />
            </div>
          </div>

          {/* Skeleton Footer Button */}
          <div className="pt-6 mt-auto">
            <div className="h-10 bg-gray-200 rounded-xl w-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;