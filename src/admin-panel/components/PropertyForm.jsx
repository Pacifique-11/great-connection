import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function PropertyForm({ onCreated, editingProperty }) {
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
    type: "House",
    features: [],
    image: null,
  });

  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (editingProperty) {
      setFormData({ ...editingProperty, image: null });
    }
  }, [editingProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["bedrooms", "bathrooms", "toilets"].includes(name)
        ? parseInt(value)
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
    const payload = new FormData();

    for (let key in formData) {
      if (formData[key] !== null) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => payload.append(key, val));
        } else {
          payload.append(key, formData[key]);
        }
      }
    }

    try {
      if (editingProperty) {
        await axiosClient.put(
          `/update-property/${editingProperty._id}`,payload);
      } else {
        await axiosClient.post( "/create-property",payload );
      }

      onCreated();
      setFormData({
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
        type: "House",
        features: [],
        image: null,
      });
      setNewFeature("");
    } catch (err) {
      console.error("Error submitting property:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
    >
      <h2 className="text-2xl font-bold col-span-full mb-2 text-center">
        {editingProperty ? "Update Property" : "Add New Property"}
      </h2>

      <div className="mb-4 w-full">
        <label htmlFor="title" className="block font-medium mb-1">Property Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the title of the property (e.g. Cozy 2-Bedroom House)"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="status" className="block font-medium mb-1">Property Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option>Available</option>
          <option>Rent</option>
          <option>Sale</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="location" className="block font-medium mb-1">Location</label>
        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter the location (e.g. Downtown, New York)"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="area" className="block font-medium mb-1">Area (e.g. 120sqm)</label>
        <input
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Enter the area of the property"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="bedrooms" className="block font-medium mb-1">Number of Bedrooms</label>
        <input
          id="bedrooms"
          name="bedrooms"
          type="number"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="Enter number of bedrooms"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="bathrooms" className="block font-medium mb-1">Number of Bathrooms</label>
        <input
          id="bathrooms"
          name="bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="Enter number of bathrooms"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="toilets" className="block font-medium mb-1">Number of Toilets</label>
        <input
          id="toilets"
          name="toilets"
          type="number"
          value={formData.toilets}
          onChange={handleChange}
          placeholder="Enter number of toilets"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="price" className="block font-medium mb-1">Price</label>
        <input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter the price (e.g. 500 USD)"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="owner" className="block font-medium mb-1">Owner Name</label>
        <input
          id="owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="Enter the owner's name"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="contact" className="block font-medium mb-1">Contact Information</label>
        <input
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Enter contact information (e.g. phone or email)"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="type" className="block font-medium mb-1">Property Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
        >
          <option>House</option>
          <option>Apartment</option>
          <option>Hotel</option>
        </select>
      </div>

      {/* Features section */}
      <div className="col-span-full mb-4 w-full">
        <label htmlFor="features" className="block font-medium mb-1">Features</label>
        <div className="flex gap-2 mb-2">
          <input
            id="features"
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature (e.g. Swimming Pool)"
            className="flex-grow border border-gray-300 p-2 rounded"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features.map((feature, idx) => (
            <span
              key={idx}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {feature}
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="description" className="block font-medium mb-1">Property Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the property and its features"
          className="border border-gray-300 p-2 rounded w-full"
          required
          rows="4"
        />
      </div>

      <div className="mb-4 w-full">
        <label htmlFor="image" className="block font-medium mb-1">Upload Property Image</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <button
        type="submit"
        className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mt-4"
      >
        {editingProperty ? "Update Property" : "Create Property"}
      </button>
    </form>
  );
}
