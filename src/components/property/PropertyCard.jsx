const PropertyCard = ({ property }) => (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="font-bold text-lg">{property.title}</h3>
      <p>{property.location}</p>
      <p>Type: {property.type}</p>
      <p>{property.description}</p>
    </div>
  );
  
  export default PropertyCard;
  