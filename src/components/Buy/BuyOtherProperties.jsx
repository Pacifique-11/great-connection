import React from "react";
import { Link } from "react-router-dom";
import land1 from "../../assets/land.jpeg";
import land2 from "../../assets/land.jpg";
import clothes from "../../assets/clothes.jpeg";

const propertyListings = [
  {
    id: 1,
    type: "land", 
    image: land1,
    name: "Prime Land in Kigali",
    price: "25,000,000 RWF",
    location: "Kigali, Rwanda",
    size: "500 sqm",
    status: "available",
  },
  {
    id: 2,
    type: "clothes", 
    image: clothes,
    name: "Designer Jacket",
    price: "50,000 RWF",
    size: "Large",
    condition: "New",
    status: "available",
  },
  {
    id: 3,
    type: "land", 
    image: land2,
    name: "Agricultural Land in Musanze",
    price: "15,000,000 RWF",
    location: "Musanze, Rwanda",
    size: "1000 sqm",
    status: "sold",
  },
];

const BuyOtherProperties = () => {
  return (
    <div className="mt-30 p-4">
      <h1 className="text-2xl font-bold text-gray-800">Other Properties</h1>
      <p className="text-gray-400">Here you can see different properties</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {propertyListings.map((property) => (
          <div key={property.id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="relative">
              <img
                src={property.image}
                alt={property.name}
                className="w-full rounded-t-lg"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-white text-xs font-bold rounded ${
                  property.status === "sold" ? "bg-orange-500" : "bg-green-500"
                }`}
              >
                {property.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-2">{property.name}</h3>
            <p className="text-green-600 text-xl font-bold">{property.price}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="text-gray-500 hover:text-gray-700">♡</button>
              <button className="text-gray-500 hover:text-gray-700">🔗</button>
              <Link to={`/${property.type}/${property.id}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyOtherProperties;