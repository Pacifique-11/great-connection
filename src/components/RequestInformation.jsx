import React, { useState } from "react";
import axios from "axios";

const ContactForm = ({ endpoint }) => {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    role: "",
    message: "",
    agree: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure agreement checkbox is ticked before proceeding
    if (!formData.agree) {
      setErrorMessage("Please agree to receive emails before submitting.");
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(endpoint, formData);
      setSuccessMessage("Request information submitted successfully!");
      setFormData(initialFormState); // reset form
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 p-6 bg-gray-100 rounded-lg shadow-lg lg:w-[900px] w-full mx-auto">
      <h1 className="text-xl font-bold text-gray-800">Contact Information</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md mt-4 text-sm font-medium">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mt-2 text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="p-2.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="p-2.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="07xxxxxxxx"
              className="p-2.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">I'm interested in</option>
              <option value="buyer">Buying</option>
              <option value="seller">Selling</option>
              <option value="guest">Other</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Hello, I am interested in this property"
            rows="3"
            className="p-2.5 bg-white border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-2 my-4">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            required
          />
          <label htmlFor="agree" className="text-gray-600 text-sm cursor-pointer">
            I agree to receive emails from <strong>GREAT CONNECTION LTD</strong>
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-[180px]"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Request Information"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;