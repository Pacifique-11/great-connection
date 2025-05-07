import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Dashboard
      </div>
      <nav className="flex-1 p-4">
        <NavLink
          to="/admin/requested-properties"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Requested Properties
        </NavLink>
        <NavLink
          to="/admin/supply-properties"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Supply Properties
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;