// src/admin-panel/pages/Users.jsx
import React from 'react';
import MainLayout from '../components/MainLayout';
import UserManagementPanel from '../components/UserManagementPanel';

export default function Users() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <UserManagementPanel />
    </MainLayout>
  );
}
