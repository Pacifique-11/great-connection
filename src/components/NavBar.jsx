import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa"
import arrow from '../../src/assets/down-arrow.png'


export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [dropdown, setDropdown] = useState(null); 

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setDropdown(null); 
  };
  const toggleDropdown = (menu, event) => {
    event.stopPropagation(); 
    setDropdown(dropdown === menu ? null : menu);
  };

  const closeDropdowns = () => {
    setDropdown(null);
  };


  return (
    <header className="w-full bg-green-500 fixed top-0 left-0 z-50" onClick={closeDropdowns}>
    
    <div className="bg-green-600 text-white  justify-end p-2 text-base hidden md:flex">
      <div className="space-x-4">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </div>

    
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-8">
		<Link to="/">
      <div className="text-xl font-bold text-green-700">
        GREAT CONNECTION BUSINESS GROUP
      </div>
		</Link>
      <button className="md:hidden text-green-700 text-2xl" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      
      <nav className="hidden md:flex space-x-6 text-black font-medium">
        <Link to="/" className="hover:text-green-800">
          Home
        </Link>

    
        <div className="relative group" onClick={(e) => e.stopPropagation()}>
          <button className="hover:text-green-800 flex  items-center" onClick={(e) => toggleDropdown("rent", e)}>
            Rent <span className="ml-1">
            <img className='h-8' src={arrow} alt="" />
            </span>
          </button>
          {dropdown === "rent" && (
            <div className="absolute bg-white shadow-md mt-2 w-48">
              <Link to="/rent-house" className="block px-4 py-2 hover:text-green-800">
                Rent House
              </Link>
              <Link to="/rent-apartment" className="block px-4 py-2 hover:text-green-800">
                Rent Apartment
              </Link>
            </div>
          )}
        </div>

        <div className="relative group" onClick={(e) => e.stopPropagation()}>
          <button className="hover:text-green-800 flex items-center" onClick={(e) => toggleDropdown("buy", e)}>
            Buy <span>
              <img className='h-8' src={arrow} alt="" />
            </span>
          </button>
          {dropdown === "buy" && (
            <div className="absolute bg-white shadow-md mt-2 w-48">
              <Link to="/buy-house" className="block px-4 py-2 hover:text-green-800">
                Buy House
              </Link>
              <Link to="/buy-apartment" className="block px-4 py-2 hover:text-green-800">
                Buy Apartment
              </Link>
            </div>
          )}
        </div>

        <Link to="/request-property" className="hover:text-green-800">
          Request a Property
        </Link>

        <Link to="/contact" className="hover:text-green-800">
          Contact
        </Link>
      </nav>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 z-50">
        <nav className="flex flex-col text-black font-medium">
          <Link to="/apartment" className="p-3 border-b hover:text-green-800">
            Home
          </Link>

          
          <div onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleDropdown("rent", e)}
              className="p-3 flex justify-between w-full border-b hover:text-green-800"
            >
              Rent <span>▼</span>
            </button>
            {dropdown === "rent" && (
              <div className="pl-5">
                <Link to="/rent-house" className="block py-2 hover:text-green-800">
                  Rent House
                </Link>
                <Link to="/rent-apartment" className="block py-2 hover:text-green-800">
                  Rent Apartment
                </Link>
              </div>
            )}
          </div>

         
          <div onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => toggleDropdown("buy", e)}
              className="p-3 flex justify-between w-full border-b hover:text-green-800"
            >
              Buy <span>▼</span>
            </button>
            {dropdown === "buy" && (
              <div className="pl-5">
                <Link to="/buy-house" className="block py-2 hover:text-green-800">
                  Buy House
                </Link>
                <Link to="/buy-apartment" className="block py-2 hover:text-green-800">
                  Buy Apartment
                </Link>
              </div>
            )}
          </div>

          <Link to="/request-property" className="p-3 border-b hover:text-green-800">
            Request a Property
          </Link>

          <Link to="/contact" className="p-3 hover:text-green-800">
            Contact
          </Link>
        </nav>
      </div>
    )}
  </header>
    
  )
}
