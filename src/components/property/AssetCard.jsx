const AssetCard = ({ asset }) => (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="font-bold text-lg">{asset.name}</h3>
      <p>{asset.location}</p>
      <p>Type: {asset.type}</p>
      <p>{asset.description}</p>
    </div>
  );
  export default AssetCard;
  