// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import arrow from '../../src/assets/down-arrow.png';

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdown, setDropdown] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setDropdown(null);
    };

    const toggleDropdown = (menu, event) => {
        event.stopPropagation();
        setDropdown(prev => (prev === menu ? null : menu));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown-container")) {
                setDropdown(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
        setDropdown(null);
    };

    return (
        <header className="w-full bg-green-600 fixed top-0 left-0 z-50 shadow-md">
            {/* Top Bar for Login/Register */}
            <div className="bg-green-700 text-white justify-end px-8 py-2 text-xs font-medium hidden md:flex space-x-4 tracking-wide">
                <Link to="/login" className="hover:underline transition">Login</Link>
                <span className="opacity-60">/</span>
                <Link to="/register" className="hover:underline transition">Register</Link>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm md:px-8">
                <div className="flex items-center gap-2">
                    <img src="https://www.greatconnectionltd.com/Logo.png" alt="Logo" className="h-9 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                    <Link to="/" className="text-lg md:text-xl font-extrabold text-green-700 tracking-wider" onClick={handleLinkClick}>
                        GREAT CONNECTION LTD
                    </Link>
                </div>
                
                <button 
                    className="md:hidden text-green-700 text-2xl cursor-pointer focus:outline-none p-1 rounded-lg hover:bg-green-50 transition" 
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-7 text-gray-800 font-medium text-sm">
                    <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>

                    {/* Rent / Property Dropdown */}
                    <div className="relative group dropdown-container">
                        <button 
                            className="hover:text-green-600 flex items-center gap-1 transition-colors cursor-pointer py-1" 
                            onClick={(e) => toggleDropdown("rent", e)}
                        >
                            <span>Our Property</span> 
                            <FiChevronDown className={`transition-transform duration-200 ${dropdown === "rent" ? "rotate-180 text-green-600" : "opacity-60"}`} size={14} />
                        </button>
                        
                        {dropdown === "rent" && (
                            <div className="absolute left-0 bg-white shadow-xl rounded-xl mt-2 w-52 py-2 border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-150">
                                <Link to="/get-properties/type/House" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>House</Link>
                                <Link to="/asset-property/Land" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Land</Link>
                                <Link to="/asset-property/Car" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Vehicles</Link>
                                <Link to="/asset-property/Motorcycle" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Motorcycles</Link>
                                <Link to="/asset-property/Other" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Other Properties</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/create-request-property" className="hover:text-green-600 transition-colors">Request Property</Link>
                    <Link to="/create-supply-property" className="hover:text-green-600 transition-colors">Supply Property</Link>
                    <Link to="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-2xl absolute w-full left-0 top-full z-50 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                    <nav className="flex flex-col text-gray-800 font-medium text-sm">
                        <Link to="/" className="px-5 py-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>
                            Home
                        </Link>

                        {/* Property Dropdown in Mobile */}
                        <div className="dropdown-container border-b border-gray-100">
                            <button onClick={(e) => toggleDropdown("rent", e)} className="px-5 py-3.5 flex justify-between items-center w-full hover:text-green-600 transition-colors cursor-pointer">
                                <span>Our Property</span> 
                                <FiChevronDown className={`transition-transform duration-200 ${dropdown === "rent" ? "rotate-180 text-green-600" : ""}`} size={16} />
                            </button>
                            {dropdown === "rent" && (
                                <div className="bg-gray-50 py-1 pl-4 flex flex-col space-y-1 border-t border-gray-100">
                                    <Link to="/get-properties/type/House" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={handleLinkClick}>House</Link>
                                    <Link to="/asset-property/Land" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Land</Link>
                                    <Link to="/asset-property/Car" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Car</Link>
                                    <Link to="/asset-property/Motorcycle" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Motorcycle</Link>
                                    <Link to="/asset-property/Other" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Other Properties</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/create-request-property" className="px-5 py-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Request Property</Link>
                        <Link to="/create-supply-property" className="px-5 py-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Supply Property</Link>
                        <Link to="/contact" className="px-5 py-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Contact</Link>

                        <div className="p-4 flex gap-3 bg-gray-50">
                            <Link to="/login" className="flex-1 text-center rounded-xl border border-gray-300 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors shadow-xs" onClick={handleLinkClick}>Login</Link>
                            <Link to="/register" className="flex-1 text-center bg-green-600 text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-green-700 transition-colors shadow-xs" onClick={handleLinkClick}>Register</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;