import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => {
  if (!properties.length== 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((prop) => (
          <PropertyCard key={prop._id} property={prop} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
