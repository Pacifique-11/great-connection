import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaShareAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import facebook from '../../src/assets/facebook.png'
import instagram from '../../src/assets/instagram.png'
import linkedin from '../../src/assets/linkedin.png'


const Contact = () => {
  return (
	
	    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen mt-20">
      <div className="md:w-1/3 space-y-6">
	  <h1 className="text-2xl font-bold text-gray-800">Get in touch</h1>
        
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-600">Location</h3>
              <p className="text-gray-700">
                No. B104 Irembo House, N.72 KN5 Road, Remera, Kigali, Rwanda
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-600">Reach us on Phone</h3>
              <p className="text-gray-700 font-bold">+250 788 441 844</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <FaShareAlt className="text-green-500 text-2xl" />
            <h3 className="font-semibold text-gray-600">Follow Us On</h3>
          </div>
          {/* Social icons (replace # with real links) */}
          <div className="flex gap-4 mt-3 text-green-500 text-xl">
            <a href="#" className="hover:text-green-700 gap-2 flex ">
				<img className='h-8' src={facebook} alt="facebook" /> facebook
			</a>
            <a href="#" className="hover:text-green-700 flex gap-2 ">
				<img className='h-8' src={linkedin} alt="linkedin" /> linkedin
			</a>
            <a href="#" className="hover:text-green-700 flex gap-2">
				<img className='h-8' src={instagram} alt="instagram" /> Instagram</a>
          </div>
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Quick Contact</h2>
        <p className="text-gray-500 mb-6">
          We will get back to you in no more than 48 hours.
        </p>

        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Name *"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <input
              type="tel"
              placeholder="Phone *"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          <textarea
            placeholder="Comments *"
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
      </div>

      
      <a
        href="https://wa.me/250788441844"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <IoLogoWhatsapp className="text-white text-3xl" />
      </a>
    </div>
  )
}

export default Contact
