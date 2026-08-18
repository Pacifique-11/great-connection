// src/admin-panel/components/Topbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiMenu, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://greatconnectionltd.onrender.com/api/logout'); 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login'); 
    } catch (err) {
      console.error('Logout failed:', err);
      // Fallback clean local state anyway
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-3.5 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30 backdrop-blur-md bg-white/90">
      {/* Left section: Sidebar toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-xl focus:outline-none md:hidden transition-all duration-200"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={22} />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
          Admin Dashboard
        </h1>
      </div>

      {/* Right section: Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 py-1.5 px-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none border border-transparent hover:border-gray-100"
          aria-expanded={dropdownOpen}
        >
          <div className="relative">
            <img 
              src="/avatar.png" 
              alt="User Avatar" 
              className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-xs" 
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Admin';
              }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-semibold text-xs text-gray-800 leading-tight">Administrator</span>
            <span className="text-[10px] text-gray-400 font-medium">System Manager</span>
          </div>
          <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} size={14} />
        </button>

        {/* Modern Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-40 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-2 border-b border-gray-50 sm:hidden">
              <p className="text-xs font-semibold text-gray-800">Administrator</p>
              <p className="text-[10px] text-gray-400">System Manager</p>
            </div>
            
            <button
              onClick={() => {
                setDropdownOpen(false);
                navigate('/admin-panel/settings');
              }}
              className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
            >
              <FiUser className="text-gray-400 group-hover:text-blue-600" size={15} /> Profile Settings
            </button>
            
            <div className="h-px bg-gray-100 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
            >
              <FiLogOut size={15} /> Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}