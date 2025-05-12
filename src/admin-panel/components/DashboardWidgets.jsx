// src/components/DashboardWidgets.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaTruck,
  FaClock
} from "react-icons/fa";

const DashboardWidgets = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeRentals: 0,
    registeredUsers: 0,
    requestedProperties: 0,
    suppliedProperties: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosClient.get("/dashboard-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const widgets = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: <FaHome className="text-blue-500" />
    },
    {
      title: "Active Rentals",
      value: stats.activeRentals,
      icon: <FaCheckCircle className="text-green-500" />
    },
    {
      title: "Registered Users",
      value: stats.registeredUsers,
      icon: <FaUsers className="text-purple-500" />
    },
    {
      title: "Requested Properties",
      value: stats.requestedProperties,
      icon: <FaClipboardList className="text-yellow-500" />
    },
    {
      title: "Supplied Properties",
      value: stats.suppliedProperties,
      icon: <FaTruck className="text-red-500" />
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: <FaClock className="text-gray-500" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {widgets.map((widget, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm font-medium text-gray-500">{widget.title}</h3>
            <p className="text-2xl font-semibold">{widget.value}</p>
          </div>
          <div className="text-4xl">{widget.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
