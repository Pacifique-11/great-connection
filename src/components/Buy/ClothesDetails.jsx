import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clothesData from "../../assets/cloth";


const ClothesDetails = () => {
  const { id } = useParams();
  const [clothes, setClothes] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  useEffect(() => {
    try {
      const clothesDetails = clothesData.find((item) => item.id === parseInt(id));
      if (!clothesDetails) {
        throw new Error("Clothes not found");
      }
      setClothes(clothesDetails);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!formData.agree) {
      alert("You must agree to be contacted about this item.");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  if (error) {
    return <h2 className="text-red-500 text-center mt-10">{error}</h2>;
  }

  if (!clothes) {
    return <h2 className="text-gray-500 text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex items-center gap-2 text-gray-600 my-6">
        <Link to="/" className="text-gray-500">Home</Link>
        <span className="text-gray-500 text-xl">/</span>
        <span className="text-gray-800">{clothes.name || "Unknown Clothes"}</span>
      </div>

      <div className="flex justify-between items-center text-xl font-bold">
        <h1 className="text-3xl">{clothes.name || "Unknown Clothes"}</h1>
        <h3 className="text-bold font-bold text-2xl">RwF {clothes.price || "N/A"}</h3>
      </div>

      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
        <p className="text-gray-700 text-lg">📏 <strong>Size:</strong> {clothes.size || "N/A"}</p>
        <p className="text-gray-700 text-lg">✨ <strong>Condition:</strong> {clothes.condition || "N/A"}</p>
        <p className="text-gray-700 text-lg">👤 <strong>Owner:</strong> {clothes.owner || "N/A"}</p>
        <p className="text-gray-700 text-lg">📞 <strong>Contact:</strong> {clothes.contact || "N/A"}</p>
      </div>

      <div className="my-12 p-6 bg-gray-100 rounded-lg shadow-lg lg:w-[900px] w-full mx-auto">
        <h1 className="text-xl font-bold">Contact Seller</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="I'm interested in this item"
              rows="3"
              className="p-2 border rounded w-full"
            ></textarea>
          </div>
          <div className="flex items-center gap-2 my-3">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label className="text-gray-600">I agree to be contacted about this item</label>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClothesDetails;