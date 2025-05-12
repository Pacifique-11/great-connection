// admin-panel/components/PropertyForm.jsx
import React, { useState } from 'react';
import axios from '../../api/axiosClient';

export default function PropertyForm({ onCreated }) {
  const [formData, setFormData] = useState({
    title: '', location: '', description: '', price: '',
    owner: '', contact: '', bedrooms: '', bathrooms: '', toilets: '',
    area: '', type: 'House', status: 'Rent', features: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'features') {
        data.append(key, formData[key].split(',').map(f => f.trim()));
      } else {
        data.append(key, formData[key]);
      }
    });
    if (image) data.append('image', image);

    try {
      await axios.post('/create-property', data);
      onCreated(); // callback to refresh property list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Add New Property</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
      <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" required />
      <input name="owner" value={formData.owner} onChange={handleChange} placeholder="Owner" className="w-full p-2 border rounded" required />
      <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 border rounded" required />
      <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="w-full p-2 border rounded" required />
      <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="w-full p-2 border rounded" required />
      <input name="toilets" type="number" value={formData.toilets} onChange={handleChange} placeholder="Toilets" className="w-full p-2 border rounded" required />
      <input name="area" value={formData.area} onChange={handleChange} placeholder="Area (sqft)" className="w-full p-2 border rounded" required />
      <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Hotel">Hotel</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="Available">Available</option>
        <option value="Rent">Rent</option>
        <option value="Sale">Sale</option>
        <option value="Pending">Pending</option>
      </select>
      <input type="file" onChange={e => setImage(e.target.files[0])} className="w-full p-2 border rounded" required />
      <input name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma-separated)" className="w-full p-2 border rounded" required />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
}
