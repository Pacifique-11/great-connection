import React from 'react';
import { useState } from 'react';

const SupplyProperty = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    status: "",
    location: "",
    owner: "",
    contact: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    area: "",
    type: "",
    features: "",
    timeAgo: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">SUPPLY PROPERTY</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Property Title" className="border p-2 rounded w-full" onChange={handleChange} />
          <input type="text" name="owner" placeholder="Owner Name" className="border p-2 rounded w-full" onChange={handleChange} />
          <input type="text" name="location" placeholder="Location" className="border p-2 rounded w-full" onChange={handleChange} />
          <input type="tel" name="contact" className="w-full border p-2 rounded" placeholder="Contact Number" onChange={handleChange} />
          <select name="status" className="border p-2 rounded w-full" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="For Rent">For Rent</option>
            <option value="For Sale">For Sale</option>
          </select>
          <input type="number" name="price" className="border p-2 rounded w-full" placeholder="Price" onChange={handleChange} />
          <input type="number" name="bedrooms" className="border p-2 rounded w-full" placeholder="Bedrooms" onChange={handleChange} />
          <input type="number" name="bathrooms" className="border p-2 rounded w-full" placeholder="Bathrooms" onChange={handleChange} />
          <input type="number" name="toilets" className="border p-2 rounded w-full" placeholder="Toilets" onChange={handleChange} />
          <input type="text" name="area" className="border p-2 rounded w-full" placeholder="Area (sqm)" onChange={handleChange} />
          <input type="text" name="type" className="border p-2 rounded w-full" placeholder="Property Type" onChange={handleChange} />
          <input type="text" name="features" className="border p-2 rounded w-full" placeholder="Features (comma separated)" onChange={handleChange} />
        </div>
        <textarea name="description" placeholder="Property Description" className="border p-2 rounded w-full" onChange={handleChange}></textarea>
        <input type="file" onChange={handleImageUpload} className="border p-2 rounded w-full cursor-pointer"  />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default SupplyProperty;
