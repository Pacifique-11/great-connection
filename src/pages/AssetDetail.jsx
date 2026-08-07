import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaLocationArrow } from "react-icons/fa";
import { NavBar } from "../components/NavBar";
import Footer from "../components/Footer";
import ContactForm from "../components/RequestInformation";

const AssetDetailPage = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`https://greatconnectionltd.onrender.com/api/property-asset/${id}`);
        // Support both direct object responses or nested wrapper properties
        const data = res.data.asset || res.data;
        setAsset(data);
      } catch (err) {
        console.error("Failed to fetch asset details:", err);
        setError('Failed to fetch asset details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAsset();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-20 mt-10 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 my-6"></div>
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="w-full h-96 bg-gray-200 rounded-xl my-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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

  if (!asset) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 px-4">
          <h2 className="text-red-500 text-2xl font-semibold">Asset not found</h2>
          <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
            &larr; Back to Listings
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Safe price formatting
  const formattedPrice = typeof asset.price === 'string' && asset.price.toLowerCase().includes('rwf')
    ? asset.price 
    : `RWF ${asset.price ?? 'N/A'}`;

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8 mt-20 mb-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-gray-600 my-6 text-sm">
          <FaHome className="text-gray-500" /> 
          <Link to="/" className="text-gray-500 hover:text-green-600 transition-colors">Home</Link> 
          <span className="text-gray-400">/</span> 
          <span className="text-gray-800 font-medium truncate max-w-xs">{asset.name}</span>
        </div>
        
        {/* Asset Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{asset.name}</h1>
          <h3 className="text-green-600 font-extrabold text-2xl">{formattedPrice}</h3>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          <span className="bg-green-500 text-white py-1.5 px-4 text-xs font-semibold rounded-lg shadow-sm">
            {asset.status || 'Available'}
          </span>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <FaLocationArrow className="text-green-500" />
            <span>{asset.location || "Kigali, Rwanda"}</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6 border border-gray-100">
          <div className="overflow-hidden rounded-xl bg-gray-100 mb-6">
            <img
              src={asset.image || 'https://via.placeholder.com/800x500?text=No+Image+Available'}
              alt={asset.name}
              className="w-full h-[350px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x500?text=Image+Not+Found';
              }}
            />
          </div>

          <h1 className="text-2xl font-bold mb-2 text-gray-800">{asset.name}</h1>
          <p className="text-lg font-semibold text-green-600 mb-4">Price: {formattedPrice}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-6 bg-gray-50 p-4 rounded-lg">
            <p><strong>Status:</strong> {asset.status || 'N/A'}</p>
            <p><strong>Location:</strong> {asset.location || "Kigali, Rwanda"}</p>
            {asset.owner && <p><strong>Owner:</strong> {asset.owner}</p>}
            {asset.contact && <p><strong>Contact:</strong> {asset.contact}</p>}
            {asset.timeAgo && <p><strong>Posted:</strong> {asset.timeAgo}</p>}
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Type-specific fields */}
          {['Car', 'Motorcycle'].includes(asset.type) && (
            <div className="space-y-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-6">
              <h3 className="text-lg font-semibold text-blue-900">Vehicle Info</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                <p><strong>Transmission:</strong> {asset.transmission || "N/A"}</p>
                <p><strong>Fuel:</strong> {asset.fuel || "N/A"}</p>
                <p><strong>Certified:</strong> {asset.certified ? "✅ Yes" : "❌ No"}</p>
                <p><strong>Inspected:</strong> {asset.inspected ? "✅ Yes" : "❌ No"}</p>
                {asset.warranty && <p><strong>Warranty:</strong> {asset.warranty}</p>}
                {asset.rentalPrice && <p><strong>Rental Price:</strong> {asset.rentalPrice}</p>}
                {asset.rentDuration && <p><strong>Rent Duration:</strong> {asset.rentDuration}</p>}
              </div>
            </div>
          )}

          {asset.type === "Land" && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Land Info</h3>
              <p className="text-sm text-gray-700"><strong>Size:</strong> {asset.size || "N/A"}</p>
            </div>
          )}

          {asset.type === "Clothes" && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Clothing Info</h3>
              <p className="text-sm text-gray-700"><strong>Condition:</strong> {asset.condition || "N/A"}</p>
              <p className="text-sm text-gray-700"><strong>Size:</strong> {asset.sizeCloth || "N/A"}</p>
            </div>
          )}

          {asset.type === "Other" && asset.description && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Details</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{asset.description}</p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-block bg-gray-800 text-white py-2 px-5 rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
            >
              &larr; Back to Listings
            </Link>
          </div>
        </div>

        {/* Contact Form Section for Asset Inquiries */}
        <div className="mt-8">
          <ContactForm endpoint={"https://greatconnectionltd.onrender.com/api/request-inform"} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AssetDetailPage;