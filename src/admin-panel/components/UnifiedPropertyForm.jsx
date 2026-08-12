import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function UnifiedPropertyForm({ editingProperty = null, onSaved = null }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "House";

  const [formData, setFormData] = useState({
    title: "",
    status: "Rent",
    location: "",
    description: "",
    price: "",
    owner: "",
    contact: "",
    bedrooms: 1,
    bathrooms: 1,
    toilets: 1,
    area: "",
    type: categoryParam,
    features: [],
    image: null,
  });

  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditing = Boolean(editingProperty);

  useEffect(() => {
    if (editingProperty) {
      setFormData({
        ...editingProperty,
        image: null,
        bedrooms: editingProperty.bedrooms || 1,
        bathrooms: editingProperty.bathrooms || 1,
        toilets: editingProperty.toilets || 1,
        features: editingProperty.features || [],
        type: editingProperty.type || categoryParam,
      });
    } else {
      setFormData((prev) => ({ ...prev, type: categoryParam }));
    }
  }, [editingProperty, categoryParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["bedrooms", "bathrooms", "toilets"].includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = new FormData();
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => payload.append(key, val));
        } else {
          payload.append(key, formData[key]);
        }
      }
    }

    try {
      if (isEditing) {
        await axiosClient.put(`/update-property/${editingProperty._id}`, payload);
      } else {
        await axiosClient.post("/create-property", payload);
      }

      if (onSaved) onSaved();
      navigate("/admin-panel/properties");
    } catch (err) {
      console.error("Error submitting unified property form:", err);
      setError(err.response?.data?.message || "Failed to save item. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic label adjustments based on category type selection
  const isRealEstate = ["House", "Apartment", "Land"].includes(formData.type);
  const isVehicle = ["Car", "Motorcycle", "Bus", "Vehicle"].includes(formData.type);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full border border-gray-100">
      <div className="col-span-full mb-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? `Edit ${formData.type}` : `Add New ${formData.type || "Listing"}`}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Fill out the specification details below.</p>
      </div>

      {error && (
        <div className="col-span-full p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium text-center">
          {error}
        </div>
      )}

      {/* Title & Category Type */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Title / Name</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Modern Villa, Toyota RAV4, Plot of Land"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Category Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <optgroup label="Real Estate">
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Land">Land</option>
          </optgroup>
          <optgroup label="Vehicles & Assets">
            <option value="Car">Car</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Bus">Bus/Van</option>
          </optgroup>
          <optgroup label="General Goods">
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food & Consumables</option>
          </optgroup>
        </select>
      </div>

      {/* Status & Price */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="Available">Available</option>
          <option value="Rent">For Rent</option>
          <option value="Sale">For Sale</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Price</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. RWF 150,000,000 or $500"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Location & Area */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Kigali, Kimihurura"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          {isRealEstate ? "Land / Property Area (sqm)" : isVehicle ? "Mileage / Engine Specs" : "Quantity / Package Size"}
        </label>
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder={isRealEstate ? "e.g. 300sqm" : isVehicle ? "e.g. 2000cc / 45,000km" : "e.g. 1 Unit / Bulk"}
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Conditional Bed/Bath fields for Real Estate */}
      {isRealEstate && formData.type !== "Land" && (
        <>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </>
      )}

      {/* Owner & Contact */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Owner / Vendor Name</label>
        <input
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="Enter provider or owner name"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Contact Information</label>
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Phone number or email"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Features section */}
      <div className="col-span-full">
        <label className="block font-medium text-sm text-gray-700 mb-1">Key Specifications / Features</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="e.g. Automatic transmission, Solar backup, Organic"
            className="flex-grow border border-gray-300 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, idx) => (
            <span key={idx} className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium text-gray-700">
              {feature}
              <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-red-500 font-bold hover:text-red-700">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="col-span-full">
        <label className="block font-medium text-sm text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed description..."
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      {/* Image File */}
      <div className="col-span-full">
        <label className="block font-medium text-sm text-gray-700 mb-1">Item Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 rounded-lg w-full bg-white text-sm"
        />
      </div>

      {/* Submit Action */}
      <div className="col-span-full flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => navigate("/admin-panel/properties")}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm shadow-sm transition disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditing ? "Update Listing" : `Create ${formData.type || "Listing"}`}
        </button>
      </div>
    </form>
  );
}