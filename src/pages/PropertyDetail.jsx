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
        setLoading(true);
        setError('');
        const response = await axios.get(`https://greatconnectionltd.onrender.com/api/get-property/${id}`);
        const data = response.data.property || response.data;
        setProperty(data); 
      } catch (err) {
        console.error("Fetch property error:", err);
        setError('Failed to fetch property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto px-4 py-20 mt-10 max-w-5xl animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 my-6"></div>
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-32 my-4"></div>
          <div className="w-full h-[400px] sm:h-[500px] bg-gray-200 rounded-lg mt-4"></div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 text-red-500 font-medium px-4">{error}</div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 px-4">
          <h2 className="text-red-500 text-2xl font-semibold">Property not found</h2>
          <Link to="/" className="inline-block mt-4 text-green-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Safe price formatting
  const formattedPrice = typeof property.price === 'string' && (property.price.toLowerCase().startsWith('rwf'))
    ? property.price 
    : `RWF ${property.price ?? 'N/A'}`;

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 max-w-5xl mt-24 mb-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-gray-600 my-6 text-sm">
          <FaHome className="text-gray-500" /> 
          <Link to="/" className="text-gray-500 hover:text-green-600 transition-colors">Home</Link> 
          <span className="text-gray-400">/</span> 
          <span className="text-gray-800 font-medium truncate max-w-xs">{property.title || property.name || 'Property Details'}</span>
        </div>

        {/* Property Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{property.title || property.name}</h1>
          <h3 className="text-green-600 font-extrabold text-2xl">
            {formattedPrice}
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          <span className="bg-green-500 text-white py-1.5 px-4 text-xs font-semibold rounded-lg shadow-sm">
            {property.status || 'Available'}
          </span>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaLocationArrow className="text-green-500" />
            <span>{property.location || 'Location not specified'}</span>
          </div>
        </div>

        {/* Main Image */}
        <div className="overflow-hidden rounded-xl shadow-lg mt-4 bg-gray-100">
          <img 
            src={property.image || 'https://via.placeholder.com/800x500?text=No+Image+Available'} 
            alt={property.title || property.name || 'Property'} 
            className="w-full h-[350px] sm:h-[550px] object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Found';
            }}
          />
        </div>

        {/* Property Description & Overview */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed text-base">{property.description || 'No description provided.'}</p>
          
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <p className="text-gray-800 flex items-center gap-2"><strong className="text-gray-900">📍 Location:</strong> {property.location || 'N/A'}</p>
            <p className="text-gray-800 flex items-center gap-2"><strong className="text-gray-900">👤 Owner:</strong> {property.owner || 'N/A'}</p>
            <p className="text-gray-800 flex items-center gap-2"><strong className="text-gray-900">📞 Contact:</strong> {property.contact || 'N/A'}</p>
          </div>
        </div>

        {/* Property Specs Grid */}
        <div className="mt-6 p-6 bg-white rounded-xl shadow-md border border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-xs text-gray-500 uppercase font-medium">Price</span>
            <span className="text-gray-800 font-semibold">{formattedPrice}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-xs text-gray-500 uppercase font-medium">Status</span>
            <span className="text-gray-800 font-semibold">{property.status || 'N/A'}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-xs text-gray-500 uppercase font-medium">Bedrooms</span>
            <span className="text-gray-800 font-semibold">{property.bedrooms ?? 'N/A'}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-xs text-gray-500 uppercase font-medium">Bathrooms</span>
            <span className="text-gray-800 font-semibold">{property.bathrooms ?? 'N/A'}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-xs text-gray-500 uppercase font-medium">Toilets</span>
            <span className="text-gray-800 font-semibold">{property.toilets ?? 'N/A'}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="block text-xs text-gray-500 uppercase font-medium">Area</span>
            <span className="text-gray-800 font-semibold">{property.area ?? 'N/A'}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Features</h3>
          <hr className="my-3 w-20 border-green-500 border-2 rounded" />
          <div className="mt-4 flex flex-wrap gap-3">
            {property.features && property.features.length > 0 ? (
              property.features.map((feature, index) => (
                <span key={index} className="bg-green-50 text-green-700 text-sm px-3 py-1.5 rounded-full font-medium border border-green-100">
                  ✓ {feature}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No specific features listed for this property.</p>
            )}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-8">
          <ContactForm endpoint={"https://greatconnectionltd.onrender.com/api/request-inform"} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetail;