// src/components/QuickActions.jsx
import React from 'react';
import { FiPlusCircle, FiCheckSquare, FiMessageSquare } from 'react-icons/fi';

const actions = [
  { title: 'Add Property', icon: <FiPlusCircle />, link: '/admin-panel/create-new-property' },
  { title: 'Request Listings', icon: <FiCheckSquare />, link: '/admin-panel/requested-property' },
  { title: 'Supply Listings', icon: <FiCheckSquare />, link: '/admin-panel/supplied-property' },
];
export default function QuickActions() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, idx) => (
          <a
            key={idx}
            href={action.link}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {action.icon}
            {action.title}
          </a>
        ))}
      </div>
    </div>
  );
}