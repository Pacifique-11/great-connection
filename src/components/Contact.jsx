import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaShareAlt } from "react-icons/fa";
import facebook from "../../src/assets/facebook.png";
import instagram from "../../src/assets/instagram.png";
import linkedin from "../../src/assets/linkedin.png";
import tiktok from "../../src/assets/ticktock.png";
import twitter from "../../src/assets/twitter.png";
import youtube from "../../src/assets/youtube.png";
import axios from "axios";
import { NavBar } from "./NavBar";

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://easy-renting-bn.onrender.com/api/create-message", formData);
      setResponseMessage(response.data.message);
      setErrorMessage("");
      setFormData({ username: "", email: "", message: "" });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      setResponseMessage("");

    }
  };

  return (
    <>
    <NavBar />
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen mt-20">
      <div className="md:w-1/3 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Get in touch</h1>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-600">Location</h3>
              <p className="text-gray-700">
                Kigali-Nyarugenge, Nyamirambo
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-600">Reach us on Phone</h3>
              <p className="text-gray-700 font-bold">+250 784008814</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <FaShareAlt className="text-green-500 text-2xl" />
            <h3 className="font-semibold text-gray-600">Follow Us On</h3>
          </div>
          <div className="flex flex-wrap gap-4 mt-3 text-green-500 text-xl">
            <a href="https://www.facebook.com/61576982134559/videos/698814396210061" className="hover:text-green-700 gap-2 flex ">
              <img className="h-8 w-8" src={facebook} alt="facebook" /> facebook
            </a>
            <a href="#" className="hover:text-green-700 flex gap-2" disable>
              <img className="h-8 w-8" src={instagram} alt="instagram" /> Instagram
            </a>
            <a href="#" className="hover:text-green-700 flex gap-2 " disable>
              <img className="h-8 w-8" src={linkedin} alt="linkedin" /> linkedin
            </a>
            <a href="#"hover:text-green-700 flex gap-2" disable>
              <img className="h-10 w-10" src={tiktok} alt="instagram" /> Tiktok
            </a>
            <a href="#" className="hover:text-green-700 flex gap-2" disable>
              <img className="h-8" src={twitter} alt="instagram" /> Twitter-X
            </a>
            <a
              href="https://www.youtube.com/watch?v=8PA9srK8ePI&t=33s"

              className="hover:text-green-700 flex gap-2">
              <img className="h-8" src={youtube} alt="youtube" /> Youtube
            </a>

          </div>
        </div>
      </div>

      <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Quick Contact</h2>
        <p className="text-gray-500 mb-6">
          We will get back to you in no more than 48 hours.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="username"
              placeholder="Name *"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Comments *"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none h-32"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-800 transition"
          >
            SEND MESSAGE
          </button>
        </form>

        {responseMessage && <p className="text-green-500 mt-4">{responseMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
    </>
    
  );
};

export default Contact;
