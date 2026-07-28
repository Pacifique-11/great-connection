import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { NavBar } from "../components/NavBar";

const GetAssetPropertyByType = () => {
  const { type } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  useEffect(() => {
    const fetchAssets = async () => {
      // Prevent fetching if type is "Other" or invalid to avoid 404s
      if (!type || type.toLowerCase() === "other") {
        setAssets([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await axios.get(
          `https://greatconnectionltd.onrender.com/api/property-asset/type/${displayType}`
        );
        
        const fetchedData = Array.isArray(res.data) 
          ? res.data 
          : (res.data.assets || res.data.properties || res.data.data || []);
          
        setAssets(fetchedData);
      } catch (err) {
        console.error("Failed to fetch assets:", err);
        // If it's a 404, show an empty state instead of a hard error message
        if (err.response && err.response.status === 404) {
          setAssets([]);
        } else {
          setError('Failed to fetch assets. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [type, displayType]);

  const handleViewDetails = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <>
      <NavBar />
      <section className="bg-gray-100 min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {displayType} Listings
            </h2>
            <p className="text-sm text-gray-500 mt-1">Explore all available asset listings for {displayType}</p>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div 
                  key={n} 
                  className="bg-white rounded-xl shadow-md p-5 animate-pulse flex flex-col justify-between"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 font-medium">
              {error}
            </div>
          ) : assets.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm max-w-lg mx-auto">
              <h3 className="text-xl font-semibold text-gray-700">No Assets Found</h3>
              <p className="text-gray-500 text-sm mt-2">No assets available for this category right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {assets.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col justify-between border border-gray-100"
                >
                  <div>
                    <div className="relative">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name || "Asset Image"}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <span className="absolute top-2 right-2 bg-black text-white text-xs px-2.5 py-1 rounded-md font-medium">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-bold text-lg mb-3">
                      {item.price?.toString().startsWith('RWF') || item.price?.toString().startsWith('RwF')
                        ? item.price
                        : `RWF ${item.price}`}
                    </p>

                    <div className="space-y-1.5 text-sm text-gray-600 border-t pt-3 border-gray-100">
                      {item.owner && (
                        <p><strong className="text-gray-700">Owner:</strong> {item.owner}</p>
                      )}
                      {item.location && (
                        <p><strong className="text-gray-700">Location:</strong> {item.location}</p>
                      )}
                      {item.contact && (
                        <p><strong className="text-gray-700">Contact:</strong> {item.contact}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleViewDetails(item._id)}
                      className="mt-5 w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium cursor-pointer"
                    >
                      View Details
                    </button>

                    {item.timeAgo && (
                      <p className="text-xs text-gray-400 mt-3 text-right">Posted: {item.timeAgo}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default GetAssetPropertyByType;