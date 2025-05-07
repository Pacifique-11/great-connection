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
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(endpoint, formData);
      setSuccessMessage("Request information submitted successfully!");
      setFormData(initialFormState); // reset form
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 p-6 bg-gray-100 rounded-lg shadow-lg lg:w-[900px] w-full mx-auto">
      <h1 className="text-xl font-bold">Contact Information</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded mt-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded mt-2">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="p-2 border rounded w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="07xxxxxxxx"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 border rounded w-full"
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
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Hello, I am interested in this property"
            rows="3"
            className="p-2 border rounded w-full"
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-2 my-3">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <label className="text-gray-600">
            I agree to receive emails from <strong>GREAT CONNECTION LTD</strong>
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Request Information"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
