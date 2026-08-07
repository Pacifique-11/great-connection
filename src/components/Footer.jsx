import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { IoLocationSharp, IoMail, IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('https://greatconnectionltd.onrender.com/api/subscribe', { email });
      setMessage(res.data.message || 'Subscribed successfully!');
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Subscription failed. Try again later.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <footer className="bg-[#002F47] mt-12 text-white pt-16 pb-10 px-6 md:px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">GREAT CONNECTION LTD</h2>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Great Connection Ltd is a trusted real estate and vehicle trading company in Rwanda. We are committed to delivering reliable, transparent, and professional services that connect clients with the best investment opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2 inline-block">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-gray-300 text-sm">
            <li className="hover:text-green-400 cursor-pointer transition">About us</li>
            <li className="hover:text-green-400 cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-green-400 cursor-pointer transition">Sell property</li>
            <li className="hover:text-green-400 cursor-pointer transition">Buy property</li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2 inline-block">Newsletter</h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-white text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && <p className={`text-xs mt-2 ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
          </div>

          <div>
            <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2 inline-block">Contact</h3>
            <div className="mt-4 space-y-3 text-gray-300 text-sm">
              <p className="flex items-center"><IoLocationSharp className="mr-2 text-green-500" /> Kigali, Rwanda</p>
              <p className="flex items-center"><IoMail className="mr-2 text-green-500" /> greatconnectionltd@gmail.com</p>
              <p className="flex items-center"><IoCall className="mr-2 text-green-500" /> +250 784008814</p>
            </div>
          </div>
        </div>
      </div>

      {/* Socials & Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex space-x-6 text-xl">
          <a href="https://www.facebook.com/profile.php?id=61576982134559" target="_blank" rel="noreferrer" className="hover:text-green-500 transition"><FaFacebook /></a>
          <a href="http://youtube.com/watch?v=8PA9srK8ePI&t=33s" target="_blank" rel="noreferrer" className="hover:text-green-500 transition"><FaYoutube /></a>
          <a href="https://www.instagram.com/greatconnectionltd" target="_blank" rel="noreferrer" className="hover:text-green-500 transition"><FaInstagram /></a>
          <a href="https://x.com/greatconection" target="_blank" rel="noreferrer" className="hover:text-green-500 transition"><FaXTwitter /></a>
          <a href="https://www.linkedin.com/in/great-connection-ltd-21b0a636a" target="_blank" rel="noreferrer" className="hover:text-green-500 transition"><FaLinkedin /></a>
          <a href="https://www.tiktok.com/@greatconnectionltd.com" target="_blank" rel="noreferrer" className="hover:text-green-500 transition"><FaTiktok /></a>
        </div>
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Great Connection. All rights reserved.</p>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/250784008814" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition z-50">
        <BsWhatsapp className="text-2xl" />
      </a>
    </footer>
  );
};

export default Footer;