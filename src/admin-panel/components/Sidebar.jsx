// src/admin-panel/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {FiHome, FiUsers, FiFileText, FiSettings, FiMessageCircle} from 'react-icons/fi';
const navItems = [
  { name: 'Dashboard', icon: <FiHome />, path: '/admin-panel' },
  { name: 'Properties', icon: <FiFileText />, path: '/admin-panel/properties' },
  { name: 'Users', icon: <FiUsers />, path: '/admin-panel/users' },
  { name: 'Messages', icon: <FiMessageCircle />, path: '/admin-panel/messages' },
  { name: 'Settings', icon: <FiSettings />, path: '/admin-panel/settings' },
];
export default function Sidebar({ isOpen, toggle }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggle}
        />
      )}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-blue-900 text-white p-4 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">EasyRent Admin</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={toggle}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-800 ${
                  isActive ? 'bg-blue-800' : ''
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
