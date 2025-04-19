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

	return (
		<header className="w-full bg-green-500 fixed top-0 left-0 z-50">

			{/* Top Bar for Login/Register */}
			<div className="bg-green-600 text-white justify-end p-2 text-base hidden md:flex">
				<div className="space-x-4">
					<Link to="/login" className="hover:underline">Login</Link>
					<Link to="/register" className="hover:underline">Register</Link>
				</div>
			</div>

			{/* Main Navigation */}
			<div className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-8">
				<Link to="/" className="text-xl font-bold text-green-700">
					GREAT CONNECTION BUSINESS GROUP
				</Link>
				<button className="md:hidden text-green-700 text-2xl" onClick={toggleMenu}>
					{isOpen ? <FaTimes /> : <FaBars />}
				</button>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex space-x-6 text-black font-medium">
					<Link to="/" className="hover:text-green-800">Home</Link>

					{/* Rent Dropdown */}
					<div className="relative group dropdown-container">
						<button className="hover:text-green-800 flex items-center mt-[-5px]" onClick={(e) => toggleDropdown("rent", e)}>
							Our Property <img className='h-8 ml-1' src={arrow} alt="arrow" />
						</button>
						{dropdown === "rent" && (
							<div className="absolute bg-white shadow-md mt-2 w-48">
								<Link to="/get-properties/type/House" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> House</Link>
								<Link to="/get-properties/type/Hotel" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Hotel</Link>
								<Link to="/get-properties/type/Apartment" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Apartment</Link>
								<Link to="/asset-property/Land" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Land</Link>
								<Link to="/asset-property/Clothes" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Clothes</Link>
								<Link to="/asset-property/Car" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Car</Link>
								<Link to="/asset-property/Motorcycle" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Motorcycle</Link>
								<Link to="/asset-property/Other" className="block px-4 py-2 hover:bg-green-600 hover:text-white"> Other Properties</Link>
							</div>
						)}
					</div>

					<Link to="/supply-property" className="hover:text-green-800">Supply Property</Link>
					<Link to="/request-property" className="hover:text-green-800">Request Property</Link>
					<Link to="/contact" className="hover:text-green-800">Contact</Link>
				</nav>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 z-50" onClick={(e) => e.stopPropagation()}>
					<nav className="flex flex-col text-black font-medium">
						<Link to="/" className="p-3 border-b hover:text-green-800" onClick={() => setIsOpen(false)}>
							Home
						</Link>

						{/* Rent Dropdown in Mobile */}
						<div className="dropdown-container">
							<button onClick={(e) => toggleDropdown("rent", e)} className="p-3 flex justify-between w-full border-b hover:text-green-800">
							Our Property <span>▼</span>
							</button>
							{dropdown === "rent" && (
								<div className="pl-5">
									<Link to="/get-properties/type/House" className="block px-4 py-2 hover:text-green-800" onClick={() => setIsOpen(false)}>	House</Link>
									<Link to="/get-properties/type/Hotel" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}> Hotel</Link>
									<Link to="/get-properties/type/Apartment" className="block px-4 py-2 hover:text-green-800" onClick={() => setIsOpen(false)}>Apartment</Link>
								    <Link to="/asset-property/Land" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}> Land</Link>
								    <Link to="/asset-property/Clothes" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}> Clothes</Link>
									<Link to="/asset-property/Car" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>Car</Link>
									<Link to="/asset-property/Motorcycle" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>Motorcycle</Link>
									<Link to="/asset-property/Other" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>Other Properties</Link>
								</div>
							)}
						</div>

						<Link to="/supply-property" className="p-3 border-b hover:text-green-800" onClick={() => setIsOpen(false)}>
							Supply Property
						</Link>
						<Link to="/request-property" className="p-3  hover:text-green-800" onClick={() => setIsOpen(false)}>Request Property</Link>
						<Link to="/contact" className="p-3 hover:text-green-800" onClick={() => setIsOpen(false)}>
							Contact
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
};