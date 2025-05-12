// src/admin-panel/components/Topbar.jsx
import React, { useState } from 'react';
import { FiUser, FiLogOut, FiMenu } from 'react-icons/fi';
import axios from 'axios';

export default function Topbar({ onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {

      await axios.post('http://localhost:3000/api/logout'); 

      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('user'); // Remove user data from local storage
      alert('Logged out successfully');
      window.location.href = '/login'; 
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed, please try again!');
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
      <button
        onClick={onToggleSidebar}
        className="text-gray-700 focus:outline-none md:hidden transition-transform duration-300 hover:rotate-90"
      >
        <FiMenu size={24} />
      </button>

      <h1 className="text-xl font-semibold ml-2">Admin Dashboard</h1>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center flex-col gap-1"
        >
          <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full" />
          <span className="font-medium text-sm text-gray-500">Admin</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
            <button
              onClick={() => alert("Open profile settings")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <FiUser /> Profile Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
