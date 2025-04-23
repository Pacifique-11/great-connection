import React from 'react';
import AssetCard from './AssetCard';

const AssetPropertyList = ({ assets }) => {
  if (!assets.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Assets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <AssetCard key={asset._id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default AssetPropertyList;
