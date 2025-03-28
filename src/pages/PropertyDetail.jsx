import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Properties from "../assets/property";
import { FaHome, FaLocationArrow } from "react-icons/fa";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
    agree: false,
  });

  useEffect(() => {
    const foundProperty = Properties.find((prop) => prop.id === id);
    setProperty(foundProperty);
  }, [id]);

  if (!property) {
    return <h2 className="text-red-500 text-center mt-10">Property not found</h2>;
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
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-gray-600 my-6">
        <FaHome /> <Link to="/" className="text-gray-500">Home</Link> <span className="text-gray-500 text-xl">/</span> <span className="text-gray-800">{property.title}</span>
      </div>

      {/* Property Header */}
      <div className="flex justify-between items-center text-xl font-bold">
        <h1 className="text-3xl">{property.title}</h1>
        <h3 className="text-bold font-bold text-2xl">RwF {property.price}</h3>
      </div>
      <div className="m-4">
        <button className="bg-green-500 text-white py-2 px-4 text-sm rounded-lg">FOR RENT</button>
        <div className="p-4 flex items-center gap-2 text-gray-600">
          <FaLocationArrow />
          <span>{property.location}</span>
        </div>
      </div>
	  <img 
  src={property.image} 
  alt={property.title} 
  className="w-full h-[600px] hover:opacity-60 transition-300 cursor-pointer object-cover mt-4 rounded-md transition-opacity duration-300" 
/>

      {/* Property Details */}
      <div className="mt-4 p-6 bg-gray-50 rounded-lg shadow-md">
  <p className="text-gray-700 text-lg">{property.description}</p>
  <div className="mt-4 space-y-2">
    <p className="text-gray-800"><strong className="text-gray-900">📍 Location:</strong> {property.location}</p>
    <p className="text-gray-800"><strong className="text-gray-900">👤 Owner:</strong> {property.owner}</p>
    <p className="text-gray-800"><strong className="text-gray-900">📞 Contact:</strong> {property.contact}</p>
  </div>
</div>

      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <p><strong>Price:</strong> RwF {property.price}</p>
        <p><strong>Status:</strong> {property.status}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Toilets:</strong> {property.toilets}</p>
        <p><strong>Area:</strong> {property.area}</p>
      </div>
      {/* addree */}

	  <div className="mt-8">
		<h3 className="text-2xl text-sembold">Address</h3>

		<hr className="my-4 w-1/2 text-gray-300"/>
		<div className="flex items-center gap-2 text-gray-600">
			<h3 className="text-xl">Address</h3>
			<span className="ml-6">{property.location}</span>
		</div>
	</div>
      {/* Features */}

<div className="mt-8">
  <h3 className="text-2xl text-sembold">Features</h3>
  <hr  className="my-4 w-1/2 text-gray-300"/>
  <div className="space-y-4 mt-4 flex flex-wrap gap-4">
    {Array.from({ length: Math.ceil(property.features.length / 3) }, (_, index) => {
      const chunk = property.features.slice(index * 3, index * 3 + 3); // Get 3 elements per div
      return (
        <div key={index} className=" p-4">
          <ul className="list-circle ml-4 text-gray-700">
            {chunk.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
</div>


      {/* Contact Form */}
      <div className="my-12 p-6 bg-gray-100 rounded-lg shadow-lg lg:w-[900px] w-full mx-auto">
        <h1 className="text-xl font-bold">Contact Information</h1>
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
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="07xxxxxxxx" className="p-2 border rounded w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="role">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="p-2 border rounded w-full">
                <option value="">I'm interested in</option>
                <option value="buyer">Buying</option>
                <option value="seller">Selling</option>
                <option value="landlord">Renting</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="message">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Hello, I am interested in this property" rows="3" className="p-2 border rounded w-full"></textarea>
          </div>
          <div className="flex items-center gap-2 my-3">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            <label className="text-gray-600">I agree to receive emails from <strong>GREAT CONNECTION LTD</strong></label>
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Request Information</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetail;
