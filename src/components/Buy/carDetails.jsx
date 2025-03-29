import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCar, FaLocationArrow } from "react-icons/fa";

const CarDetail = () => {
  const { id } = useParams();
  const [car, ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  useEffect(() => {
    // Fetch car data dynamically from API or state management
    // Example: Replace this with actual fetching logic
    // fetch(`/api/cars/${id}`).then(res => res.json()).then(data => setCar(data));
  }, [id]);

  if (!car) {
    return <h2 className="text-red-500 text-center mt-10">Car not found</h2>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex items-center gap-2 text-gray-600 my-6">
        <FaCar /> <Link to="/" className="text-gray-500">Home</Link> 
        <span className="text-gray-500 text-xl">/</span> 
        <span className="text-gray-800">{car.name}</span>
      </div>

      <div className="flex justify-between items-center text-xl font-bold">
        <h1 className="text-3xl">{car.name}</h1>
        <h3 className="text-bold font-bold text-2xl">RwF {car.price}</h3>
      </div>
      <div className="m-4">
        <button className="bg-green-500 text-white py-2 px-4 text-sm rounded-lg">FOR SALE</button>
        <div className="p-4 flex items-center gap-2 text-gray-600">
          <FaLocationArrow />
          <span>{car.location}</span>
        </div>
      </div>

      <img src={car.image} alt={car.name} className="w-full h-[400px] object-cover mt-4 rounded-md" />

      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg">🚗 <strong>Transmission:</strong> {car.transmission}</p>
        <p className="text-gray-700 text-lg">⚡ <strong>Fuel Type:</strong> {car.fuel}</p>
        <p className="text-gray-700 text-lg">📜 <strong>Status:</strong> {car.status}</p>
        <p className="text-gray-700 text-lg">🛡 <strong>Warranty:</strong> {car.warranty}</p>
        <p className="text-gray-700 text-lg">✅ <strong>Certified:</strong> {car.certified ? "Yes" : "No"}</p>
        <p className="text-gray-700 text-lg">🔍 <strong>Inspected:</strong> {car.inspected ? "Yes" : "No"}</p>
        <p className="text-gray-700 text-lg">📍 <strong>Location:</strong> {car.location}</p>
        <p className="text-gray-700 text-lg">👤 <strong>Owner:</strong> {car.owner}</p>
        <p className="text-gray-700 text-lg">📞 <strong>Contact:</strong> {car.contact}</p>
      </div>

      <div className="my-12 p-6 bg-gray-100 rounded-lg shadow-lg lg:w-[900px] w-full mx-auto">
        <h1 className="text-xl font-bold">Contact Seller</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" className="p-2 border rounded w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" className="p-2 border rounded w-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="message">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="I'm interested in this car" rows="3" className="p-2 border rounded w-full"></textarea>
          </div>
          <div className="flex items-center gap-2 my-3">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            <label className="text-gray-600">I agree to be contacted about this vehicle</label>
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Send Inquiry</button>
        </form>
      </div>
    </div>
  );
};

export default CarDetail;
