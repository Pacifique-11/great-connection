import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHome, FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { NavBar } from "../components/NavBar";
import Footer from "../components/Footer";
import ContactForm from "../components/RequestInformation";


const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`https://easy-renting-bn.onrender.com/api/get-property/${id}`);
        const data = response.data.property;
        setProperty(data); 
      } catch (err) {
        setError('Failed to fetch property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!property) {
    return <h2 className="text-red-500 text-center mt-10">Property not found</h2>;
  }

  return (
    <>
    <NavBar />
    <div className="container mx-auto p-6 mt-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-gray-600 my-6">
        <FaHome /> <Link to="/" className="text-gray-500 hover:text-blue-300">Home</Link> <span className="text-gray-500 text-xl">/</span> <span className="text-gray-800 hover:text-blue-300">{property.title}</span>
      </div>

      {/* Property Header */}
      <div className="flex justify-between items-center ">
        <h1 className="text-md font-semibold">{property.title}</h1>
        <h3 className="text-bold font-bold text-xl">RwF {property.price}</h3>
      </div>
      <div className="m-4">
        <button className="bg-green-500 text-white py-2 px-4 text-sm rounded-lg">{property.status}</button>
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

      {/* Features */}
	  <div className="mt-8">
  <h3 className="text-2xl text-sembold">Features</h3>
  <hr className="my-4 w-1/2 text-gray-300" />
  <div className="space-y-4 mt-4 flex flex-wrap gap-4">
    {property.features && property.features.length > 0 ? (
      property.features.map((feature, index) => (
        <div key={index} className="p-4">
          <ul className="list-circle ml-4 text-gray-700">
            <li>{feature}</li>
          </ul>
        </div>
      ))
    ) : (
      <p className="text-gray-600">No features available for this property.</p>
    )}
  </div>
</div>
	  <ContactForm endpoint={"https://easy-renting-bn.onrender.com/api/request-inform"}  />
    </div>
    <Footer />
    </>
    
  );
};

export default PropertyDetail;
