import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHome, FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import ContactForm from "../RequestInformation";

const SupplyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
 
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `https://easy-renting-bn.onrender.com/api/supply-property/${id}`
        );
        console.log("Property Data", res.data);
        setProperty(res.data.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="text-center py-20 text-lg">Loading property details...</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-gray-600 my-6">
        <FaHome /> <Link to="/" className="text-gray-500">Home</Link> <span className="text-gray-500 text-xl">/</span> <span className="text-gray-800">{property.title}</span>
      </div>

      {/* Property Header */}
      <div className="flex justify-between items-center text-xl font-bold">
        <h1 className="text-3xl">{property.title}</h1>
        <h3 className="text-bold font-bold text-2xl">RwF {property.price}</h3>
      </div>

      <div className="m-4">
        <button className="bg-green-500 text-white py-2 px-4 text-sm rounded-lg">FOR RENT</button>
        <div className="p-4 flex items-center gap-2 text-gray-600">
          <FaLocationArrow />
          <span>{property.location}</span>
        </div>
      </div>

      <img
        src={property.image}
        alt={property.title}
        className="w-full h-[600px] hover:opacity-60 transition-300 cursor-pointer object-cover mt-4 rounded-md transition-opacity duration-300"
      />

      {/* Property Details */}
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg">{property.description}</p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-800"><strong className="text-gray-900">📍 Location:</strong> {property.location}</p>
          <p className="text-gray-800"><strong className="text-gray-900">👤 Owner:</strong> {property.owner}</p>
          <p className="text-gray-800"><strong className="text-gray-900">📞 Contact:</strong> {property.contact}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <p><strong>Price:</strong> RwF {property.price}</p>
        <p><strong>Status:</strong> {property.status}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Toilets:</strong> {property.toilets}</p>
        <p><strong>Area:</strong> {property.area}</p>
      </div>

      {/* Address */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Address</h3>
        <hr className="my-4 w-1/2 text-gray-300" />
        <div className="flex items-center gap-2 text-gray-600">
          <h3 className="text-xl">Address</h3>
          <span className="ml-6">{property.location}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Features</h3>
        <hr className="my-4 w-1/2 text-gray-300" />
        <div className="space-y-4 mt-4 flex flex-wrap gap-4">
          {property.features && property.features.length > 0 ? (
            Array.from({ length: Math.ceil(property.features.length / 3) }, (_, index) => {
              const chunk = property.features.slice(index * 3, index * 3 + 3);
              return (
                <div key={index} className="p-4">
                  <ul className="list-disc ml-4 text-gray-700">
                    {chunk.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No features listed for this property.</p>
          )}
        </div>
      </div>

	  <ContactForm  endpoint={"https://easy-renting-bn.onrender.com/api/request-inform"}/>
    </div>
  );
};

export default SupplyDetail;
