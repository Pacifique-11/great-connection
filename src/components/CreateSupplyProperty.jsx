import React from 'react';
import { useState } from 'react';
import axios from "axios";
const CreateSupplyProperty = () => {
	const [formData, setFormData] = useState({
		id: "",
		title: "",
		price: "",
		status: "",
		location: "",
		requesterName: "",
		contact: "",
		description: "",
		bedrooms: "",
		bathrooms: "",
		toilets: "",
		area: "",
		type: "",
		features: [],
		image: null,
	  });  
	  const [feature, setFeature] = useState("");
      const [features, setFeatures] = useState([]);

	  const addFeature = () => {
		if (feature.trim()) {
		  setFeatures([...features, feature.trim()]);
		  setFeature("");
		}
	  };
	
	  const removeFeature = (index) => {
		const updated = [...features];
		updated.splice(index, 1);
		setFeatures(updated);
	  };
	
	  const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
	  const handleImageUpload = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	  };
	  const handleSubmit = async (e) => {
		e.preventDefault();
	  
		try {
		  const data = new FormData();
		  Object.entries(formData).forEach(([key, value]) => {
			if (value) data.append(key, value);
		  });
	  
		  const res = await axios.post("https://easy-renting-bn.onrender.com/api/supply-property", data, {
			headers: {
			  "Content-Type": "multipart/form-data",
			},
		  });
	  
		  console.log("Success:", res.data);
		  alert("supplied submitted successfully!");
	  
		  setFormData({
			id: "",
			title: "",
			price: "",
			status: "",
			location: "",
			requesterName: "",
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
	  
		} catch (error) {
		  console.error("Error submitting request:", error.response?.data || error.message);
		  alert("Something went wrong while submitting the request.");
		}
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
            <option value="Rent">For Rent</option>
            <option value="Sale">For Sale</option>
          </select>
          <input type="number" name="price" className="border p-2 rounded w-full" placeholder="Price" onChange={handleChange} />
          <input type="number" name="bedrooms" className="border p-2 rounded w-full" placeholder="Bedrooms" onChange={handleChange} />
          <input type="number" name="bathrooms" className="border p-2 rounded w-full" placeholder="Bathrooms" onChange={handleChange} />
          <input type="number" name="toilets" className="border p-2 rounded w-full" placeholder="Toilets" onChange={handleChange} />
          <input type="text" name="area" className="border p-2 rounded w-full" placeholder="Area (sqm)" onChange={handleChange} />
          <input type="text" name="type" className="border p-2 rounded w-full" placeholder="Property Type" onChange={handleChange} />     
	</div>
	<div className="w-full max-w-md">
      <label className="block font-semibold mb-2">Add Features:</label>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow rounded"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          placeholder="e.g. WiFi, Pool"
        />
        <button
          className="bg-blue-600 text-white px-6 rounded"
          onClick={addFeature}
          type="button"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 px-4 py-1 rounded-full flex items-center"
          >
            {item}
            <button
              className="ml-2 text-red-500"
              onClick={() => removeFeature(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div> 

        <textarea name="description" placeholder="Property Description" className="border p-2 rounded w-full" onChange={handleChange}></textarea>
        <input type="file" onChange={handleImageUpload} name="image" className="border p-2 rounded w-full cursor-pointer"  />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default CreateSupplyProperty;
