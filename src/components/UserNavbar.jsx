// components/UserNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex justify-between items-center bg-green-600 text-white px-6 py-3">
      <div>
        <h2 className="text-lg font-semibold">Welcome, {user.username}</h2>
        <p className="text-sm">{user.email} ({user.role})</p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default UserNavbar;
