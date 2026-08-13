import React from "react";
import { Link } from "react-router-dom";
import MainLayout from '../components/MainLayout';
import AssetTable from '../components/AssetTable';
import { FiTruck, FiMapPin, FiShoppingBag, FiBox } from 'react-icons/fi';

export default function Assets() {
  return (
    <MainLayout>
      {/* Header & Quick Action CTAs */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Assets & Goods</h2>
          <p className="text-sm text-gray-500 mt-0.5">Control cars, motorcycles, land, apparel, and other asset inventories.</p>
        </div>

        {/* Quick CTA Buttons matching schema enums: Car, Motorcycle, Land, Clothes, Other */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin-panel/create-asset?category=Car"
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <FiTruck size={14} />
            <span>Add Vehicle</span>
          </Link>

          <Link
            to="/admin-panel/create-asset?category=Motorcycle"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <FiTruck size={14} />
            <span>Add Motorcycle</span>
          </Link>

          <Link
            to="/admin-panel/create-asset?category=Land"
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <FiMapPin size={14} />
            <span>Add Land</span>
          </Link>

          <Link
            to="/admin-panel/create-asset?category=Clothes"
            className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <FiShoppingBag size={14} />
            <span>Add Clothes</span>
          </Link>

          <Link
            to="/admin-panel/create-asset?category=Other"
            className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <FiBox size={14} />
            <span>Add Asset and Goods</span>
          </Link>
        </div>
      </div>

      <AssetTable />
    </MainLayout>
  );
}