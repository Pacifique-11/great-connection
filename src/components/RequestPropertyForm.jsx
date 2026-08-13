import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import WelcomeBanner from '../components/WelcomeBanner';

const RequestProperty = ({ editingRequest = null, onSaved = null }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "", price: "", status: "", location: "", requesterName: "",
    contact: "", description: "", bedrooms: "", bathrooms: "",
    toilets: "", area: "", type: "", image: null,
  });

  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(id && !editingRequest));
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const activeEditingData = editingRequest || null;
  const isEditing = Boolean(id || activeEditingData);

  useEffect(() => {
    if (id && !editingRequest) {
      const fetchRequestDetails = async () => {
        try {
          setFetching(true);
          const res = await axiosClient.get(`/request-property/${id}`);
          const data = res.data.request || res.data;
          setFormData({
            title: data.title || "", price: data.price || "", status: data.status || "",
            location: data.location || "", requesterName: data.requesterName || "",
            contact: data.contact || "", description: data.description || "",
            bedrooms: data.bedrooms || "", bathrooms: data.bathrooms || "",
            toilets: data.toilets || "", area: data.area || "", type: data.type || "",
            image: null,
          });
          setFeatures(data.features || []);
        } catch (err) {
          setErrorMessage("Failed to load request details.");
        } finally {
          setFetching(false);
        }
      };
      fetchRequestDetails();
    } else if (editingRequest) {
      setFormData({
        title: editingRequest.title || "", price: editingRequest.price || "", status: editingRequest.status || "",
        location: editingRequest.location || "", requesterName: editingRequest.requesterName || "",
        contact: editingRequest.contact || "", description: editingRequest.description || "",
        bedrooms: editingRequest.bedrooms || "", bathrooms: editingRequest.bathrooms || "",
        toilets: editingRequest.toilets || "", area: editingRequest.area || "", type: editingRequest.type || "",
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
    features.forEach((feat) => formDataToSend.append("features", feat));

    try {
      const targetId = id || activeEditingData?._id || activeEditingData?.id;
      if (isEditing && targetId) {
        await axiosClient.put(`/request-property/${targetId}`, formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
        setSuccessMessage("Property request updated successfully!");
      } else {
        await axiosClient.post("/request-property", formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
        setSuccessMessage("Your request has been submitted successfully!");
      }
      if (onSaved) onSaved();
      setTimeout(() => {
        if (isEditing && id) navigate("/admin-panel/requested-property");
        else setFormData({ title: "", price: "", status: "", location: "", requesterName: "", contact: "", description: "", bedrooms: "", bathrooms: "", toilets: "", area: "", type: "", image: null });
        setFeatures([]);
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center bg-white shadow-xl rounded-2xl my-20 border border-gray-100">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent mb-3"></div>
        <p className="text-gray-500 font-medium">Loading request data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WelcomeBanner 
        title={isEditing ? "Edit Request" : "Request a Property"} 
        subtitle="Specify your requirements and let Great Connection Ltd find the perfect asset for you." 
      />

      <div className="max-w-4xl mx-auto -mt-10 mb-16 px-4 relative z-20">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8 border-b border-gray-100 pb-4">
            {isEditing ? "Edit Request Details" : "Property Request Form"}
          </h2>

          {successMessage && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-center font-medium border border-emerald-100">{successMessage}</div>}
          {errorMessage && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-center font-medium border border-red-100">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: 'title', label: 'Property Title *' },
                { name: 'price', label: 'Budget Price *', type: 'number' },
                { name: 'location', label: 'Location *' },
                { name: 'requesterName', label: 'Requester Name' },
                { name: 'contact', label: 'Contact Number' },
                { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
                { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
                { name: 'toilets', label: 'Toilets', type: 'number' },
                { name: 'area', label: 'Preferred Area (sqm)' },
                { name: 'type', label: 'Property Type' }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">{field.label}</label>
                  <input type={field.type || 'text'} name={field.name} value={formData[field.name]} onChange={handleChange} className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" placeholder={field.label} required={field.label.includes('*')} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500 bg-white" required>
                  <option value="">-- Select Status --</option>
                  <option value="Rent">For Rent</option>
                  <option value="Sale">For Sale</option>
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Add Features</label>
              <div className="flex gap-2 mb-3">
                <input type="text" className="border border-gray-300 p-3 flex-grow rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-500" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="e.g. WiFi, Pool" />
                <button type="button" onClick={addFeature} className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 text-sm font-semibold transition">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.map((item, index) => (
                  <span key={index} className="bg-green-50 border border-green-200 px-3 py-1 rounded-full text-xs font-medium text-green-800">{item} <button type="button" className="ml-2 text-red-500" onClick={() => removeFeature(index)}>&times;</button></span>
                ))}
              </div>
            </div>

            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Additional Requirements" className="border border-gray-300 p-3 rounded-xl w-full text-sm outline-none focus:ring-2 focus:ring-green-500" rows="4"></textarea>

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-4 rounded-xl font-semibold hover:bg-green-700 transition shadow-md">
              {loading ? "Processing..." : isEditing ? "Update Request" : "Submit Request"}
            </button>
          </form>
        </div>
      </div>

      {/*Back to home section like footer*/}
      <div className="back-to-home flex items-center justify-center flex-col my-10 space-y-2">
          <p className="text-gray-500 text-sm">Finished here?</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 text-white px-6 py-2.5 rounded-xl hover:bg-gray-900 transition font-medium text-xs shadow-sm"
          >
            &larr; Back to Home Page
          </button>
        </div>
    </div>
  );
};

export default RequestProperty;