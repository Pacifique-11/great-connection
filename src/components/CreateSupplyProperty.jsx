import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient"; // Uses your configured project axios instance
import WelcomeBanner from '../components/WelcomeBanner';

const CreateSupplyProperty = ({ editingSupply = null, onSaved = null }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Catches ID if accessed via an admin edit route like /admin-panel/supplied-property/:id

  const [formData, setFormData] = useState({
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
    image: null,
  });

  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(id && !editingSupply));
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const activeEditingData = editingSupply || null;
  const isEditing = Boolean(id || activeEditingData);

  // Fetch supply details if editing via URL param and data wasn't passed as a prop
  useEffect(() => {
    if (id && !editingSupply) {
      const fetchSupplyDetails = async () => {
        try {
          setFetching(true);
          const res = await axiosClient.get(`/supply-property/${id}`);
          const data = res.data.supply || res.data;
          
          setFormData({
            title: data.title || "",
            price: data.price || "",
            status: data.status || "",
            location: data.location || "",
            owner: data.owner || data.requesterName || "",
            contact: data.contact || "",
            description: data.description || "",
            bedrooms: data.bedrooms || "",
            bathrooms: data.bathrooms || "",
            toilets: data.toilets || "",
            area: data.area || "",
            type: data.type || "",
            image: null,
          });
          setFeatures(data.features || []);
        } catch (err) {
          console.error("Error fetching supply property details:", err);
          setErrorMessage("Failed to load supply details for editing.");
        } finally {
          setFetching(false);
        }
      };
      fetchSupplyDetails();
    } else if (editingSupply) {
      setFormData({
        title: editingSupply.title || "",
        price: editingSupply.price || "",
        status: editingSupply.status || "",
        location: editingSupply.location || "",
        owner: editingSupply.owner || editingSupply.requesterName || "",
        contact: editingSupply.contact || "",
        description: editingSupply.description || "",
        bedrooms: editingSupply.bedrooms || "",
        bathrooms: editingSupply.bathrooms || "",
        toilets: editingSupply.toilets || "",
        area: editingSupply.area || "",
        type: editingSupply.type || "",
        image: null,
      });
      setFeatures(editingSupply.features || []);
    }
  }, [id, editingSupply]);

  const addFeature = () => {
    if (feature.trim() && !features.includes(feature.trim())) {
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
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      // Append all features array items explicitly
      features.forEach((feat) => {
        data.append("features", feat);
      });

      const targetId = id || activeEditingData?._id || activeEditingData?.id;

      if (isEditing && targetId) {
        // Update supply property (PUT)
        await axiosClient.put(`/supply-property/${targetId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Supply property updated successfully!");
      } else {
        // Create new supply property (POST)
        await axiosClient.post("/supply-property", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Supply submitted successfully!");
      }

      if (onSaved) onSaved();

      setTimeout(() => {
        setSuccessMessage("");
        if (isEditing && id) {
          navigate("/admin-panel/supplied-property");
        } else if (!isEditing) {
          setFormData({
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
            image: null,
          });
          setFeatures([]);
        }
      }, 2000);

    } catch (error) {
      console.error("Error submitting supply property:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Something went wrong while submitting the supply.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center bg-white shadow-lg rounded-lg my-10">
        <p className="text-gray-500 font-medium">Loading supply item data...</p>
      </div>
    );
  }

  return (
    <>
      <WelcomeBanner />
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg py-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditing ? "EDIT SUPPLY PROPERTY" : "SUPPLY PROPERTY"}
        </h2>
        {successMessage && <p className="mb-4 p-3 bg-green-50 text-green-600 rounded text-center font-medium">{successMessage}</p>}
        {errorMessage && <p className="mb-4 p-3 bg-red-50 text-red-600 rounded text-center font-medium">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              placeholder="Property Title *" 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="owner" 
              value={formData.owner} 
              placeholder="Owner Name *" 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              onChange={handleChange} 
              required 
            />
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              placeholder="Location *" 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              onChange={handleChange} 
              required 
            />
            <input 
              type="tel" 
              name="contact" 
              value={formData.contact} 
              className="w-full border p-2.5 rounded outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Contact Number *" 
              onChange={handleChange} 
              required 
            />
            <select 
              name="status" 
              value={formData.status} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500 bg-white" 
              onChange={handleChange}
              required
            >
              <option value="">-- Select Status --</option>
              <option value="Rent">For Rent</option>
              <option value="Sale">For Sale</option>
              <option value="Available">Available</option>
            </select>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Price *" 
              onChange={handleChange} 
              required 
            />
            <input 
              type="number" 
              name="bedrooms" 
              value={formData.bedrooms} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Bedrooms (if applicable)" 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              name="bathrooms" 
              value={formData.bathrooms} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Bathrooms (if applicable)" 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              name="toilets" 
              value={formData.toilets} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Toilets (if applicable)" 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              name="area" 
              value={formData.area} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Area (sqm)" 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              name="type" 
              value={formData.type} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Property Type (House, Land, Vehicle, etc.)" 
              onChange={handleChange} 
            />
          </div>

          {/* Features Section */}
          <div className="w-full">
            <label className="block font-semibold mb-2 text-sm text-gray-700">Add Features:</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                className="border p-2.5 flex-grow rounded outline-none focus:ring-2 focus:ring-green-500 text-sm"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="e.g. WiFi, Pool, Solar Power"
              />
              <button
                className="bg-blue-600 text-white px-6 py-2.5 rounded hover:bg-blue-700 text-sm font-semibold transition"
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
                  className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full flex items-center text-sm text-gray-700"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                    onClick={() => removeFeature(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div> 

          <textarea 
            name="description" 
            value={formData.description} 
            placeholder="Property Description" 
            className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500" 
            rows="4"
            onChange={handleChange}
          ></textarea>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEditing ? "Replace Property Image (Optional)" : "Upload Property Image"}
            </label>
            <input 
              type="file" 
              onChange={handleImageUpload} 
              name="image" 
              className="border p-2 rounded w-full cursor-pointer bg-white text-sm" 
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              type="submit" 
              className={`flex-1 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : isEditing ? "Update Supply" : "Submit Supply"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={() => navigate('/admin-panel/supplied-property')}
                className="px-6 bg-gray-300 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {!isEditing && (
        <div className="back-to-home flex items-center justify-center flex-col my-6 space-y-2">
          <p className="text-gray-600 text-sm">Go back to the home page</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            Back to Home
          </button>
        </div>
      )}
    </>
  );
};

export default CreateSupplyProperty;