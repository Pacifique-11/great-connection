import React, { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom";
import axios from "axios";
import { FaHome,FaLocationArrow } from "react-icons/fa";
import { NavBar } from "../components/NavBar";

const AssetDetailPage = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axios.get(`https://easy-renting-bn.onrender.com/api/property-asset/${id}`);
        setAsset(res.data);
      } catch (error) {
        console.error("Failed to fetch asset details:", error);
      }
    };

    fetchAsset();
  }, [id]);

  if (!asset) {
    return <div className="text-center py-20">Loading asset details...</div>;
  }

  return (
    <>
    <NavBar />
    <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
        <h3>Welcome,{asset.type} Details </h3>
        <div className="flex items-center gap-2 text-gray-600 my-6">
                <FaHome /> <Link to="/" className="text-gray-500 hover:text-blue-300">Home</Link> <span className="text-gray-500 text-xl">/</span> <span className="text-gray-800 hover:text-blue-300">{asset.name}</span>
              </div>
        
              {/* Property Header */}
              <div className="flex justify-between items-center ">
                <h1 className="text-md font-semibold">{asset.name}</h1>
                <h3 className="text-bold font-bold text-xl">RwF {asset.price}</h3>
              </div>
              <div className="m-4">
                <button className="bg-green-500 text-white py-2 px-4 text-sm rounded-lg">{asset.status}</button>
                <div className="p-4 flex items-center gap-2 text-gray-600">
                  <FaLocationArrow />
                  <span>{asset.location || "Kigali,Rwanda" }</span>
                </div>
              </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <img
          src={asset.image}
          alt={asset.name}
          className="w-full h-96 object-cover rounded mb-6"
        />

        <h1 className="text-3xl font-bold mb-2 text-blue-800">{asset.name}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-2">Price: {asset.price}</p>
        <p className="text-gray-600 mb-2">Status: {asset.status}</p>
        {asset.owner && <p className="text-gray-700">Owner: {asset.owner}</p>}
        {asset.contact && <p className="text-gray-700">Contact: {asset.contact}</p>}
        {asset.location && <p className="text-gray-700">Location: {asset.location}</p>}
        {asset.timeAgo && <p className="text-gray-500 text-sm">Posted: {asset.timeAgo}</p>}

        <hr className="my-6" />

        {/* Type-specific fields */}
        {['Car', 'Motorcycle'].includes(asset.type) && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Vehicle Info</h3>
            <p>Transmission: {asset.transmission || "N/A"}</p>
            <p>Fuel: {asset.fuel || "N/A"}</p>
            <p>Certified: {asset.certified ? "✅ Yes" : "❌ No"}</p>
            <p>Inspected: {asset.inspected ? "✅ Yes" : "❌ No"}</p>
            {asset.warranty && <p>Warranty: {asset.warranty}</p>}
            {asset.rentalPrice && <p>Rental Price: {asset.rentalPrice}</p>}
            {asset.rentDuration && <p>Rent Duration: {asset.rentDuration}</p>}
          </div>
        )}

        {asset.type === "Land" && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Land Info</h3>
            <p>Size: {asset.size}</p>
          </div>
        )}

        {asset.type === "Clothes" && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Clothing Info</h3>
            <p>Condition: {asset.condition}</p>
            <p>Size: {asset.sizeCloth}</p>
          </div>
        )}

        {asset.type === "Other" && asset.description && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Details</h3>
            <p>{asset.description}</p>
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default AssetDetailPage;
