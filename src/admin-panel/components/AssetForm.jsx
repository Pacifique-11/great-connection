import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function AssetForm({ editingAsset = null, onSaved = null }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "Car";

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: categoryParam,
    status: "Rent",
    owner: "",
    contact: "",
    // Car & Motorcycle
    transmission: "",
    fuel: "",
    certified: false,
    inspected: false,
    warranty: "",
    rentalPrice: "",
    rentDuration: "",
    // Land
    location: "",
    size: "",
    // Clothes
    condition: "New",
    sizeCloth: "",
    // Others
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEditing = Boolean(id || editingAsset);

  useEffect(() => {
    if (id && !editingAsset) {
      axiosClient.get(`/property-asset/${id}`)
        .then(res => {
          const data = res.data.asset || res.data;
          setFormData({
            name: data.name || "",
            price: data.price || "",
            type: data.type || categoryParam,
            status: data.status || "Rent",
            owner: data.owner || "",
            contact: data.contact || "",
            transmission: data.transmission || "",
            fuel: data.fuel || "",
            certified: Boolean(data.certified),
            inspected: Boolean(data.inspected),
            warranty: data.warranty || "",
            rentalPrice: data.rentalPrice || "",
            rentDuration: data.rentDuration || "",
            location: data.location || "",
            size: data.size || "",
            condition: data.condition || "New",
            sizeCloth: data.sizeCloth || "",
            description: data.description || "",
            image: null,
          });
        })
        .catch(err => {
          console.error("Error fetching asset details:", err);
          setError("Failed to load asset details.");
        });
    } else if (editingAsset) {
      setFormData({
        ...editingAsset,
        image: null,
      });
    }
  }, [id, editingAsset, categoryParam]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      const targetId = id || editingAsset?._id || editingAsset?.id;
      if (isEditing && targetId) {
        await axiosClient.put(`/property-asset/${targetId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axiosClient.post("/property-asset", payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      if (onSaved) onSaved();
      navigate("/admin-panel/assets");
    } catch (err) {
      console.error("Error saving asset:", err);
      setError(err.response?.data?.message || "Failed to save asset. Check required fields.");
    } finally {
      setLoading(false);
    }
  };

  const isVehicle = ["Car", "Motorcycle"].includes(formData.type);
  const isLand = formData.type === "Land";
  const isClothes = formData.type === "Clothes";

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full border border-gray-100 my-6 max-w-4xl mx-auto">
      <div className="col-span-full mb-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? `Edit Asset (${formData.type})` : `Create New Asset (${formData.type})`}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Fill out schema attributes based on asset category type.</p>
      </div>

      {error && (
        <div className="col-span-full p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-medium text-center">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Asset Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Toyota RAV4, Plot in Kimironko"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Type Enum */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Asset Type *</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        >
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Land">Land</option>
          <option value="Clothes">Clothes</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Status Enum */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        >
          <option value="Rent">For Rent</option>
          <option value="Sale">For Sale</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Price *</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. RWF 15,000,000"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      {/* Owner & Contact */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Owner Name</label>
        <input
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="Owner name"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block font-medium text-sm text-gray-700 mb-1">Contact Phone/Email</label>
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact info"
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* --- CONDITIONAL FIELDS ACCORDING TO SCHEMA --- */}

      {/* Vehicle Fields (Car & Motorcycle) */}
      {isVehicle && (
        <>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Transmission</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg w-full text-sm bg-white">
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Fuel Type</label>
            <select name="fuel" value={formData.fuel} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg w-full text-sm bg-white">
              <option value="">Select Fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Warranty</label>
            <input name="warranty" value={formData.warranty} onChange={handleChange} placeholder="e.g. 1 Year" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Rental Price / Rent Duration</label>
            <div className="grid grid-cols-2 gap-2">
              <input name="rentalPrice" value={formData.rentalPrice} onChange={handleChange} placeholder="Rate (e.g. 50k)" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
              <input name="rentDuration" value={formData.rentDuration} onChange={handleChange} placeholder="Duration (e.g. /day)" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-6 pt-4 col-span-full">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" name="certified" checked={formData.certified} onChange={handleChange} className="w-4 h-4 text-purple-600 rounded" />
              Certified Vehicle
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
              <input type="checkbox" name="inspected" checked={formData.inspected} onChange={handleChange} className="w-4 h-4 text-purple-600 rounded" />
              Inspected
            </label>
          </div>
        </>
      )}

      {/* Land Fields */}
      {isLand && (
        <>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Location</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Gasabo, Kigali" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Land Size</label>
            <input name="size" value={formData.size} onChange={handleChange} placeholder="e.g. 400 sqm" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
          </div>
        </>
      )}

      {/* Clothes Fields */}
      {isClothes && (
        <>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange} className="border border-gray-300 p-2.5 rounded-lg w-full text-sm bg-white">
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Cloth Size</label>
            <input name="sizeCloth" value={formData.sizeCloth} onChange={handleChange} placeholder="e.g. XL / Medium" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
          </div>
        </>
      )}

      {/* Location field for general assets */}
      {!isLand && (
        <div className="col-span-full">
          <label className="block font-medium text-sm text-gray-700 mb-1">Location</label>
          <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Kigali, Rwanda" className="border border-gray-300 p-2.5 rounded-lg w-full text-sm" />
        </div>
      )}

      {/* Description */}
      <div className="col-span-full">
        <label className="block font-medium text-sm text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter detailed description..."
          className="border border-gray-300 p-2.5 rounded-lg w-full text-sm outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Image File Upload */}
      <div className="col-span-full">
        <label className="block font-medium text-sm text-gray-700 mb-1">Image *</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border border-gray-300 p-2 rounded-lg w-full bg-white text-sm cursor-pointer"
          required={!isEditing}
        />
      </div>

      {/* Action Buttons */}
      <div className="col-span-full flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => navigate("/admin-panel/assets")}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-sm shadow-sm transition disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditing ? "Update Asset" : "Create Asset"}
        </button>
      </div>
    </form>
  );
}