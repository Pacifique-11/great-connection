import React from "react";
import { Link } from "react-router-dom";
import MainLayout from '../components/MainLayout';
import PropertyTable from '../components/PropertyTable';
import { FiPlus, FiHome, FiTruck, FiMapPin, FiBox } from 'react-icons/fi';

export default function Properties() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage All Listings</h2>
          <p className="text-sm text-gray-500 mt-0.5">Control houses, land, vehicles, and general goods from one place.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin-panel/create-new-property?category=House"
            className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <FiHome size={14} />
            <span>Add House | Hotel | Apartment</span>
          </Link>

        </div>
      </div>
      <PropertyTable />
    </MainLayout>
  );
}