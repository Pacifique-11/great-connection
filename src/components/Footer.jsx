import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLocationSharp, IoMail, IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";


const Footer = () => {
  return (
	<footer className="bg-[#002F47] text-white py-10 px-6 md:px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-green-700">GREAT CONNECTION BUSINESS GROUP</span>
          </h2>
          <p className="mt-4 text-gray-300 text-sm">
            Are you considering investing in real estate in Rwanda? great connection business group
            can help you find the best deal in Kigali. We offer a variety
            of real estate services, including finding buy a property or
            rent in Kigali, such as houses, land, apartments, and cars.
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-gray-300 text-sm">
            <li>About us</li>
            <li>Neighborhoods</li>
            <li>Blog</li>
            <li>FAQs (Frequently Asked Questions)</li>
            <li>Sell your property</li>
            <li>Real Estate Investment Calculator</li>
          </ul>
        </div>

        
        <div className="space-y-6">
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2">
              Newsletter
            </h3>
            <p className="text-sm text-gray-300 mt-2">Email address</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 mt-2 rounded-md bg-white text-gray-800"
            />
            <button className="mt-2 w-full bg-green-400 border-green-700 text-white py-2 rounded-md
			 hover:green-800 transition cursor-pointer ">
              SUBSCRIBE
            </button>
            <p className="text-xs text-gray-400 mt-1">We never spam you!</p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2">
              Contact
            </h3>
            <p className="flex items-center mt-2 text-gray-300">
              <IoLocationSharp className="mr-2 border-green-700" />
              Ikaze House 1st Floor, Remera Kigali
            </p>
            <p className="flex items-center mt-2 text-gray-300">
              <IoMail className="mr-2 border-green-700" />
              business@quick.rw
            </p>
            <p className="flex items-center mt-2 text-gray-300">
              <IoCall className="mr-2 border-green-700" />
              +250 785 711 348
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <FaFacebookF className="text-xl border-green-700 cursor-pointer" />
          <FaInstagram className="text-xl border-green-700 cursor-pointer" />
          <FaYoutube className="text-xl border-green-700 cursor-pointer" />
        </div>
    
	   <a href="https://wa.me/+250783908965" target='_blank' >
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full cursor-pointer shadow-lg">
          <BsWhatsapp className="text-2xl" />
        </div>
	   </a>
      </div>
    </footer>
  )
}

export default Footer
