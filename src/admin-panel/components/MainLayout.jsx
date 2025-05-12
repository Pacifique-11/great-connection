// src/admin-panel/components/MainLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Manage sidebar open/close state

  return (
    <div className="flex h-screen font-poppins">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} /> {/* Pass the sidebar state to Sidebar */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar Component */}
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> {/* Toggle sidebar */}
        
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children} {/* Render children content */}
        </main>
      </div>
    </div>
  );
}
