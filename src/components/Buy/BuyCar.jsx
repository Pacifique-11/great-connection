import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BuyCar = () => {
  const [carListings, setCarListings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://easy-renting-bn.onrender.com/api/car");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data.data)) {
          setCarListings(response.data.data); 
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching car listings:", err);
        setError("Failed to fetch car data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDetailClick = (id) => {
    navigate(`/car/${id}`);
  };

  if (loading) {
    return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500 mt-10">{error}</h2>;
  }

  if (!Array.isArray(carListings) || carListings.length === 0) {
    return <h2 className="text-center text-gray-500 mt-10">No cars available.</h2>;
  }

  return (
    <div className="mt-30 p-4">
      <h1 className="text-2xl font-bold text-gray-800">New cars</h1>
      <p className="text-gray-400">Here you can see different new cars</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {carListings.map((car) => (
          <div key={car._id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="relative">
              <img src={car.image || "https://via.placeholder.com/400"} alt={car.name} className="w-full rounded-t-lg" />
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-white text-xs font-bold rounded ${
                  car.status === "sold" ? "bg-orange-500" : "bg-green-500"
                }`}
              >
                {car.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-2">{car.name}</h3>
            <p className="text-green-600 text-xl font-bold">{car.price}</p>
            <div className="flex items-center text-gray-600 text-sm mt-2">
              <span className="mr-4">⚙ {car.transmission}</span>
              <span>⛽ {car.fuel}</span>
            </div>
            <div className="flex items-center text-green-500 text-sm mt-2">
              {car.certified && <span className="mr-4">✔ Certified</span>}
              {car.inspected && <span className="mr-4">🔍 Inspected</span>}
              {car.warranty && <span>🛡 {car.warranty}</span>}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="text-gray-500 hover:text-gray-700">♡</button>
              <button className="text-gray-500 hover:text-gray-700">🔗</button>
              <button
                onClick={() => handleDetailClick(car.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCar;