import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";

import { IoLocationSharp, IoMail, IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import axios from 'axios';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://easy-renting-bn.onrender.com/api/subscribe', { email });

      if (res.status === 201) {
        setMessage(res.data.message);
        setEmail(''); // Clear the email field immediately after success

      }
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      if (error.response) {

        setMessage(error.response.data.message || 'Subscription failed. Please try again later.');
      } else {
        setMessage('Subscription failed. Please try again later.');
      }
      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
        setEmail(''); // Clear the email field after 5 seconds
      }, 5000);
    } finally {
      setLoading(false); // Stop the loading state
    }

  }

  return (
    <footer className="bg-[#002F47] mt-12 text-white py-10 px-6 md:px-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <span className="text-green-700">GREAT CONNECTION</span>
          </h2>
          <p className="mt-4 text-gray-300 text-sm">
            Are you considering investing in real estate in Rwanda? great connection
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
            <li>Terms & condition</li>
            <li>Sell property</li>
            <li>Buy property</li>
          </ul>
        </div>


        <div className="space-y-6">
          {/* Newsletter */}
          <div>

            <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2">
              Newsletter
            </h3>
            <p className="text-sm text-gray-300 mt-2">Email address</p>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 mt-2 rounded-md bg-white text-gray-800"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="mt-2 w-full bg-green-400 border-green-700 text-white py-2 rounded-md hover:bg-green-800 transition cursor-pointer"

              >
                {loading ? 'Please wait......!' : 'Subscribe'}
              </button>
            </form>

            {message && <h3 className="text-xs text-green-400 mt-1">{message}</h3>}
            <p className="text-xs text-gray-400 mt-1">We never spam you!</p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold border-b-2 border-green-700 pb-2">
              Contact
            </h3>
            <p className="flex items-center mt-2 text-gray-300">
              <IoLocationSharp className="mr-2 text-green-700" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Kigali-Nyarugenge,+Makuza+plaza"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Kigali-Nyarugenge, Nyamirambo
              </a>
            </p>

            <p className="flex items-center mt-2 text-gray-300">
              <IoMail className="mr-2 text-green-700" />
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=juniorally910@gmail.com" className="hover:underline">
                pacifique.rw@gmail.com
              </a>
            </p>

            <p className="flex items-center mt-2 text-gray-300">
              <IoCall className="mr-2 text-green-700" />
              <a href="tel:+250785711348" className="hover:underline">
                +250 784008814
              </a>
            </p>
          </div>
        </div>
      </div>


      <div className="mt-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <a
            href="https://web.facebook.com/dusabimana.paccy.5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 flex gap-2 cursor-pointer transition duration-300"         >
            <FaFacebook />
          </a>
          <a
            href="https://www.youtube.com/@pacifiquedusabimana135"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 flex gap-2 cursor-pointer transition duration-300"         >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/pacifique_dusabimana/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 flex gap-2 cursor-pointer transition duration-300"         >
            <FaInstagram />
          </a>
          <a href="https://x.com/Pacifique11111" target='_blank' rel="noopener noreferrer" className="hover:text-green-700 flex gap-2 cursor-pointer transition duration-300"
          >            <FaXTwitter />


          </a>
          <a href="https://www.linkedin.com/in/pacifique-dusabimana-51a48a350/" className="hover:text-green-700 flex gap-2 cursor-pointer transition duration-300" rel="noopener noreferrer" target='_blank'>

            <FaLinkedin />

          </a>
          <a
            href="https://www.tiktok.com/@pacifique.11_d1/"
            className="hover:text-green-700 flex gap-2 cursor-pointer transition duration-300"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTiktok />
          </a>

        </div>


        <a href="https://wa.me/250784008814" className="hover:text-green-700 flex gap-2">
          <div className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full cursor-pointer shadow-lg">
            <BsWhatsapp className="text-2xl" />
          </div>
        </a>

      </div>
      <div className="text-center mt-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Great Connection. All rights reserved.
      </div>
    </footer>
  )
}
export default Footer
