import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import WelcomeBanner from '../components/WelcomeBanner';

const CreateSupplyProperty = ({ editingSupply = null, onSaved = null }) => {
  const navigate = useNavigate();
  const { id } = useParams();

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

      features.forEach((feat) => {
        data.append("features", feat);
      });

      const targetId = id || activeEditingData?._id || activeEditingData?.id;

      if (isEditing && targetId) {
        await axiosClient.put(`/supply-property/${targetId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Supply property updated successfully!");
      } else {
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
      <div className="max-w-3xl mx-auto p-12 text-center bg-white shadow-xl rounded-2xl my-20 border border-gray-100">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent mb-3"></div>
        <p className="text-gray-500 font-medium">Loading supply item data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Modernized Welcome Banner Integration */}
        <WelcomeBanner 
          title={isEditing ? "Edit Supply Listing" : "Supply a Property or Asset"} 
          subtitle="Publish your real estate property or vehicle listing to connect with active buyers and renters instantly." 
        />

        <div className="max-w-4xl mx-auto -mt-10 mb-16 px-4 relative z-20">
          <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-100">
            <div className="mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {isEditing ? "Edit Supplied Property Details" : "Property Supply Form"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Please provide accurate information regarding the asset or property.</p>
            </div>

            {successMessage && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center font-medium border border-emerald-100">{successMessage}</div>}
            {errorMessage && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-center font-medium border border-red-100">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Property Title *</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    placeholder="e.g. Modern Villa in Nyarutarama" 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Owner / Supplier Name *</label>
                  <input 
                    type="text" 
                    name="owner" 
                    value={formData.owner} 
                    placeholder="Full Name" 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Location *</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    placeholder="e.g. Kigali, Gasabo" 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Contact Number *</label>
                  <input 
                    type="tel" 
                    name="contact" 
                    value={formData.contact} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. +250 780 000 000" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Listing Status *</label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Status --</option>
                    <option value="Rent">For Rent</option>
                    <option value="Sale">For Sale</option>
                    <option value="Available">Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Price (RWF) *</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. 500000" 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Bedrooms</label>
                  <input 
                    type="number" 
                    name="bedrooms" 
                    value={formData.bedrooms} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. 3" 
                    onChange={handleChange} 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Bathrooms</label>
                  <input 
                    type="number" 
                    name="bathrooms" 
                    value={formData.bathrooms} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. 2" 
                    onChange={handleChange} 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Toilets</label>
                  <input 
                    type="number" 
                    name="toilets" 
                    value={formData.toilets} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. 3" 
                    onChange={handleChange} 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Area Size</label>
                  <input 
                    type="text" 
                    name="area" 
                    value={formData.area} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. 250 sqm" 
                    onChange={handleChange} 
                  />
                </div>

                <div className="col-span-full">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Property / Asset Type</label>
                  <input 
                    type="text" 
                    name="type" 
                    value={formData.type} 
                    className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" 
                    placeholder="e.g. House, Land, Car, Motorcycle" 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Features Section */}
              <div className="w-full pt-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Add Key Features</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    className="border border-gray-300 p-3 flex-grow rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                    placeholder="e.g. WiFi, Swimming Pool, Backup Generator"
                  />
                  <button
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 text-sm font-semibold transition shadow-sm"
                    onClick={addFeature}
                    type="button"
                  >
                    Add Feature
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {features.map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-full flex items-center text-xs font-medium text-green-800 shadow-2xs"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        className="ml-2 text-red-500 hover:text-red-700 font-bold text-sm leading-none"
                        onClick={() => removeFeature(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div> 

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Detailed Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  placeholder="Describe your property attributes, neighborhood benefits, or vehicle condition..." 
                  className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white" 
                  rows="4"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  {isEditing ? "Replace Property Image (Optional)" : "Upload Property Image *"}
                </label>
                <input 
                  type="file" 
                  onChange={handleImageUpload} 
                  name="image" 
                  className="border border-gray-300 p-2.5 rounded-xl w-full cursor-pointer bg-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                  required={!isEditing}
                />
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  className={`flex-1 bg-green-600 text-white p-3.5 rounded-xl font-semibold hover:bg-green-700 transition shadow-md text-sm ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Saving Supply..." : isEditing ? "Update Supply Property" : "Submit Supply Listing"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => navigate('/admin-panel/supplied-property')}
                    className="px-6 bg-gray-100 text-gray-700 p-3.5 rounded-xl font-semibold hover:bg-gray-200 transition text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {!isEditing && (
        <div className="back-to-home flex items-center justify-center flex-col my-10 space-y-2">
          <p className="text-gray-500 text-sm">Finished here?</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-xl hover:bg-gray-900 transition font-medium text-xs shadow-sm"
          >
            &larr; Back to Home Page
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSupplyProperty;