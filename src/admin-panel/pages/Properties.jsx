// src/admin-panel/pages/Properties.jsx
import React from "react";
import MainLayout from '../components/MainLayout';
import PropertyTable from '../components/PropertyTable';

export default function Properties() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Manage Properties</h2>
      <PropertyTable />
    </MainLayout>
  );
}
