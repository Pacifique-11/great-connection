import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
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
        <header className="w-full bg-green-500 fixed top-0 left-0 z-50 shadow-sm">
            {/* Top Bar for Login/Register */}
            <div className="bg-green-600 text-white justify-end px-6 py-2 text-sm hidden md:flex space-x-4">
                <Link to="/login" className="hover:underline transition">Login</Link>
                <span>/</span>
                <Link to="/register" className="hover:underline transition">Register</Link>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-8">
                <Link to="/" className="text-xl font-bold text-green-700 tracking-wide" onClick={handleLinkClick}>
                    GREAT CONNECTION
                </Link>
                <button className="md:hidden text-green-700 text-2xl cursor-pointer focus:outline-none" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-black font-medium">
                    <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>

                    {/* Rent Dropdown */}
                    <div className="relative group dropdown-container">
                        <button 
                            className="hover:text-green-600 flex items-center transition-colors cursor-pointer" 
                            onClick={(e) => toggleDropdown("rent", e)}
                        >
                            Our Property <img className='h-8 ml-1.5 opacity-70' src={arrow} alt="arrow" />
                        </button>
                        {dropdown === "rent" && (
                            <div className="absolute bg-white shadow-lg rounded-md mt-2 w-48 py-2 border border-gray-100">
                                <Link to="/get-properties/type/House" className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>House</Link>
                                <Link to="/asset-property/Land" className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Land</Link>
                                <Link to="/asset-property/Car" className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Car</Link>
                                <Link to="/asset-property/Motorcycle" className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Motorcycle</Link>
                                <Link to="/asset-property/Other" className="block px-4 py-2 text-sm hover:bg-green-50 hover:text-green-700 transition-colors" onClick={handleLinkClick}>Other Properties</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/login" className="hover:text-green-600 transition-colors">Request Property</Link>
                    <Link to="/login" className="hover:text-green-600 transition-colors">Supply Property</Link>
                    <Link to="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-16 z-50 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                    <nav className="flex flex-col text-black font-medium">
                        <Link to="/" className="p-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>
                            Home
                        </Link>

                        {/* Rent Dropdown in Mobile */}
                        <div className="dropdown-container border-b border-gray-100">
                            <button onClick={(e) => toggleDropdown("rent", e)} className="p-3.5 flex justify-between items-center w-full hover:text-green-600 transition-colors cursor-pointer">
                                <span>Our Property</span> 
                                <span className={`text-xs transform transition-transform ${dropdown === "rent" ? "rotate-180" : ""}`}>▼</span>
                            </button>
                            {dropdown === "rent" && (
                                <div className="bg-gray-50 py-1 pl-4 flex flex-col space-y-1">
                                    <Link to="/get-properties/type/House" className="block px-4 py-2 text-sm hover:text-green-600 transition-colors" onClick={handleLinkClick}>House</Link>
                                    <Link to="/asset-property/Land" className="block px-4 py-2 text-sm hover:text-green-600 transition-colors" onClick={handleLinkClick}>Land</Link>
                                    <Link to="/asset-property/Car" className="block px-4 py-2 text-sm hover:text-green-600 transition-colors" onClick={handleLinkClick}>Car</Link>
                                    <Link to="/asset-property/Motorcycle" className="block px-4 py-2 text-sm hover:text-green-600 transition-colors" onClick={handleLinkClick}>Motorcycle</Link>
                                    <Link to="/asset-property/Other" className="block px-4 py-2 text-sm hover:text-green-600 transition-colors" onClick={handleLinkClick}>Other Properties</Link>
                                </div>
                            )}
                        </div>

                        <Link to="/login" className="p-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Request Property</Link>
                        <Link to="/login" className="p-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Supply Property</Link>
                        <Link to="/contact" className="p-3.5 border-b border-gray-100 hover:text-green-600 transition-colors" onClick={handleLinkClick}>Contact</Link>

                        <div className="p-4 flex space-x-4 bg-gray-50 mt-2">
                            <Link to="/login" className="flex-1 text-center rounded-md border border-gray-300 py-2 text-sm hover:bg-gray-100 transition-colors" onClick={handleLinkClick}>Login</Link>
                            <Link to="/register" className="flex-1 text-center bg-green-600 text-white rounded-md py-2 text-sm hover:bg-green-700 transition-colors" onClick={handleLinkClick}>Register</Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;