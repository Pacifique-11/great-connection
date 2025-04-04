import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import arrow from '../../src/assets/down-arrow.png';

export const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false); // Mobile menu state
	const [dropdown, setDropdown] = useState(null); // Dropdown state

	// Toggle mobile menu
	const toggleMenu = () => {
		setIsOpen(!isOpen);
		setDropdown(null); // Close any open dropdowns when menu is toggled
	};

	// Toggle dropdown visibility
	const toggleDropdown = (menu, event) => {
		event.stopPropagation(); // Prevent menu from closing immediately
		setDropdown(prev => (prev === menu ? null : menu)); // Toggle dropdown state
	};

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest(".dropdown-container")) {
				setDropdown(null); // Close dropdowns
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
						<button className="hover:text-green-800 flex items-center" onClick={(e) => toggleDropdown("rent", e)}>
							Rent <img className='h-8 ml-1' src={arrow} alt="arrow" />
						</button>
						{dropdown === "rent" && (
							<div className="absolute bg-white shadow-md mt-2 w-48">
								<Link to="/rent-house" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Rent House</Link>
								<Link to="/rent-apartment" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Rent Apartment</Link>
								<Link to="/rent-car" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Rent Car</Link>
								<Link to="/rent-motorcycle" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Rent Motorcycle</Link>
								<Link to="/rent-other-properties" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Rent Other Properties</Link>
							</div>
						)}
					</div>

					{/* Buy Dropdown */}
					<div className="relative group dropdown-container">
						<button className="hover:text-green-800 flex items-center" onClick={(e) => toggleDropdown("buy", e)}>
							Buy <img className='h-8 ml-1' src={arrow} alt="arrow" />
						</button>
						{dropdown === "buy" && (
							<div className="absolute bg-white shadow-md mt-2 w-48">
								<Link to="/buy-house" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Buy House</Link>
								<Link to="/buy-apartment" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Buy Apartment</Link>
								<Link to="/buy-car" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Buy Car</Link>
								<Link to="/buy-motorcycle" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Buy Motorcycle</Link>
								<Link to="/buy-other-properties" className="block px-4 py-2 hover:bg-green-600 hover:text-white">Buy Other Properties</Link>
							</div>
						)}
					</div>

					<Link to="/supply-property" className="hover:text-green-800">Supply Property</Link>
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
								Rent <span>▼</span>
							</button>
							{dropdown === "rent" && (
								<div className="pl-5">
									<Link to="/rent-house" className="block py-2 hover:text-green-800" onClick={() => setIsOpen(false)}>
										Rent House
									</Link>
									<Link to="/rent-apartment" className="block py-2 hover:text-green-800" onClick={() => setIsOpen(false)}>
										Rent Apartment
									</Link>
									<Link to="/rent-car" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>
										Rent Car
									</Link>
									<Link to="/rent-motorcycle" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>
										Rent Motorcycle
									</Link>
									<Link to="/rent-other-properties" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>
										Rent Other Properties
									</Link>
								</div>
							)}
						</div>

						{/* Buy Dropdown in Mobile */}
						<div className="dropdown-container">
							<button onClick={(e) => toggleDropdown("buy", e)} className="p-3 flex justify-between w-full border-b hover:text-green-800">
								Buy <span>▼</span>
							</button>
							{dropdown === "buy" && (
								<div className="pl-5">
									<Link to="/buy-house" className="block py-2 hover:text-green-800" onClick={() => setIsOpen(false)}>
										Buy House
									</Link>
									<Link to="/buy-apartment" className="block py-2 hover:text-green-800" onClick={() => setIsOpen(false)}>
										Buy Apartment
									</Link>
									<Link to="/buy-car" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>
										Buy Car
									</Link>
									<Link to="/buy-motorcycle" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>
										Buy Motorcycle
									</Link>
									<Link to="/buy-other-properties" className="block px-4 py-2 hover:bg-green-600 hover:text-white" onClick={() => setIsOpen(false)}>
										Buy Other Properties
									</Link>
								</div>
							)}
						</div>

						<Link to="/supply-property" className="p-3 border-b hover:text-green-800" onClick={() => setIsOpen(false)}>
							Supply Property
						</Link>
						<Link to="/contact" className="p-3 hover:text-green-800" onClick={() => setIsOpen(false)}>
							Contact
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
};
