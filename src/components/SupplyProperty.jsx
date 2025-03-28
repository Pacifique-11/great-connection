
import React from 'react'
import { useState } from 'react'

const SupplyProperty = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        ownership: "",
        phone: "",
        email: "",
        propertyType: "",
        propertyCriteria: "",
        propertyLocation: "",
        price: "",
        description: "",
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
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">OFFER PROPERTY</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name*" className="border p-2 rounded w-full" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name*" className="border p-2 rounded w-full" onChange={handleChange} />
        <select name="ownership" className="border p-2 rounded w-full" onChange={handleChange}>
          <option>-- What is your ownership --</option>
          <option value="owner">Owner</option>
          <option value="agent">Agent</option>
        </select>
        <div className="flex items-center border p-2 rounded w-full">
          <span className="mr-2">🇷🇼 +250</span>
          <input type="tel" name="phone" className="w-full" placeholder="Phone number" onChange={handleChange} />
        </div>
        <input type="email" name="email" placeholder="Email*" className="border p-2 rounded w-full" onChange={handleChange} />
        <select name="propertyCriteria" className="border p-2 rounded w-full" onChange={handleChange}>
          <option>-- Listing type --</option>
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>
        <select name="propertyType" className="border p-2 rounded w-full" onChange={handleChange}>
          <option>-- Select property type --</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>
        <input type="text" name="propertyLocation" placeholder="Property Location" className="border p-2 rounded w-full" onChange={handleChange} />
        <div className="flex items-center border p-2 rounded w-full">
          <span className="mr-2">Rwf</span>
          <input type="number" name="price" className="w-full" placeholder="Only digits" onChange={handleChange} />
        </div>
      </div>
      <textarea name="description" placeholder="Property Description" className="border p-2 rounded w-full" onChange={handleChange}></textarea>
      <input type="file" onChange={handleImageUpload} className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Submit</button>
    </form>
  </div>
  )
}

export default SupplyProperty

