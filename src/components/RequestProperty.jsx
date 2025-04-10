import React, { useState } from "react";
import axios from "axios";

const RequestProperty = () => {
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
    features: "",
    image: null, // Matches the schema
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post("https://easy-renting-bn.onrender.com/api/request-property", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Your request has been submitted successfully!");
      console.log("Response:", response.data);

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrorMessage("Failed to submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">REQUEST PROPERTY</h2>

      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Property Title *"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Budget Price *"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />
          <select name="status" className="border p-2 rounded w-full" onChange={handleChange}>
            <option value="">-- Select Status --</option>
            <option value="For Rent">For Rent</option>
            <option value="For Sale">For Sale</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Preferred Location *"
            className="border p-2 rounded w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="requesterName"
            placeholder="Your Name"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="bedrooms"
            placeholder="Minimum Bedrooms"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="bathrooms"
            placeholder="Minimum Bathrooms"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="toilets"
            placeholder="Minimum Toilets"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="area"
            placeholder="Preferred Area (sqm)"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            placeholder="Property Type"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="features"
            placeholder="Desired Features (comma separated)"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Additional Requirements"
          className="border p-2 rounded w-full"
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className={`bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestProperty;

