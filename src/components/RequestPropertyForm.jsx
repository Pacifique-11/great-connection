import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient"; // Using your custom configured axios instance
import WelcomeBanner from '../components/WelcomeBanner';

const RequestProperty = ({ editingRequest = null, onSaved = null }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Catches ID if accessed via an admin edit route like /admin-panel/requested-property/:id

  const [formData, setFormData] = useState({
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
    image: null,
  });

  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(id && !editingRequest));
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const activeEditingData = editingRequest || null;
  const isEditing = Boolean(id || activeEditingData);

  // Fetch data if editing via URL parameter and data isn't passed directly
  useEffect(() => {
    if (id && !editingRequest) {
      const fetchRequestDetails = async () => {
        try {
          setFetching(true);
          const res = await axiosClient.get(`/request-property/${id}`);
          const data = res.data.request || res.data;
          
          setFormData({
            title: data.title || "",
            price: data.price || "",
            status: data.status || "",
            location: data.location || "",
            requesterName: data.requesterName || "",
            contact: data.contact || "",
            description: data.description || "",
            bedrooms: data.bedrooms || "",
            bathrooms: data.bathrooms || "",
            toilets: data.toilets || "",
            area: data.area || "",
            type: data.type || "",
            image: null, // Keep file input clear for updates
          });
          setFeatures(data.features || []);
        } catch (err) {
          console.error("Error fetching request property details:", err);
          setErrorMessage("Failed to load request details.");
        } finally {
          setFetching(false);
        }
      };
      fetchRequestDetails();
    } else if (editingRequest) {
      setFormData({
        title: editingRequest.title || "",
        price: editingRequest.price || "",
        status: editingRequest.status || "",
        location: editingRequest.location || "",
        requesterName: editingRequest.requesterName || "",
        contact: editingRequest.contact || "",
        description: editingRequest.description || "",
        bedrooms: editingRequest.bedrooms || "",
        bathrooms: editingRequest.bathrooms || "",
        toilets: editingRequest.toilets || "",
        area: editingRequest.area || "",
        type: editingRequest.type || "",
        image: null,
      });
      setFeatures(editingRequest.features || []);
    }
  }, [id, editingRequest]);

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
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

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append features array properly to FormData
    features.forEach((feat) => {
      formDataToSend.append("features", feat);
    });

    try {
      const targetId = id || activeEditingData?._id || activeEditingData?.id;

      if (isEditing && targetId) {
        // Update request (Admin/Client update)
        await axiosClient.put(`/request-property/${targetId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Property request updated successfully!");
      } else {
        // Create new request
        await axiosClient.post("/request-property", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMessage("Your request has been submitted successfully!");
      }

      if (onSaved) onSaved();

      setTimeout(() => {
        setSuccessMessage("");
        if (isEditing && id) {
          navigate("/admin-panel/requested-property");
        } else if (!isEditing) {
          setFormData({
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
            image: null,
          });
          setFeatures([]);
        }
      }, 2000);
    } catch (error) {
      console.error("Error submitting property request:", error);
      setErrorMessage(error.response?.data?.message || "Failed to submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center bg-white shadow-lg rounded-lg my-10">
        <p className="text-gray-500 font-medium">Loading request data...</p>
      </div>
    );
  }

  return (
    <>
      <WelcomeBanner />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg py-10 my-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditing ? "EDIT PROPERTY REQUEST" : "REQUEST PROPERTY"}
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
              name="price"
              value={formData.price}
              placeholder="Budget Price *"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
            <select 
              name="status" 
              value={formData.status} 
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500 bg-white" 
              onChange={handleChange}
            >
              <option value="">-- Select Status --</option>
              <option value="Rent">For Rent</option>
              <option value="Sale">For Sale</option>
            </select>
            <input
              type="text"
              name="location"
              value={formData.location}
              placeholder="Preferred Location *"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              placeholder="Your Name"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              placeholder="Contact Number"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              placeholder="Minimum Bedrooms"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              placeholder="Minimum Bathrooms"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="toilets"
              value={formData.toilets}
              placeholder="Minimum Toilets"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="area"
              value={formData.area}
              placeholder="Preferred Area (sqm)"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              placeholder="Property Type (e.g. House, Land)"
              className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
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
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="e.g. WiFi, Pool, Security"
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
            placeholder="Additional Requirements"
            className="border p-2.5 rounded w-full outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            onChange={handleChange}
          ></textarea>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEditing ? "Replace Request Image (Optional)" : "Upload Image"}
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="border p-2 rounded w-full bg-white text-sm"
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
              {loading ? "Saving..." : isEditing ? "Update Request" : "Submit Request"}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={() => navigate('/admin-panel/requested-property')}
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

export default RequestProperty;