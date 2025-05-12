// src/admin-panel/components/PropertyTable.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { FiEdit, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';

export default function PropertyTable() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState({ location: '', type: '', status: '' });

  // Fetch properties from backend
  useEffect(() => {
    axiosClient.get('/get-properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);
   
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axiosClient.delete(`/delete-property/${id}`);
        setProperties(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosClient.put(`/update-property/${id}`, { status: 'Approved' });
      setProperties(prev =>
        prev.map(p => p._id === id ? { ...p, status: 'Approved' } : p)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = properties.filter(p =>
    (!filter.location || p.location === filter.location) &&
    (!filter.type || p.type === filter.type) &&
    (!filter.status || p.status === filter.status)
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">Property Listings</h3>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <select onChange={e => setFilter({ ...filter, location: e.target.value })} className="p-2 border rounded">
          <option value="">All Locations</option>
          <option value="Kigali">Kigali</option>
          <option value="Karongi">Karongi</option>
          <option value="Musanze">Musanze</option>
        </select>
        <select onChange={e => setFilter({ ...filter, type: e.target.value })} className="p-2 border rounded">
          <option value="">All Types</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Flat">Hotel</option>
        </select>
        <select onChange={e => setFilter({ ...filter, status: e.target.value })} className="p-2 border rounded">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full text-left border-t">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-2 px-3 border-b">Name</th>
            <th className="py-2 px-3 border-b">Type</th>
            <th className="py-2 px-3 border-b">Location</th>
            <th className="py-2 px-3 border-b">Status</th>
            <th className="py-2 px-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((property) => (
            <tr key={property._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">{property.title}</td>
              <td className="py-2 px-3">{property.type}</td>
              <td className="py-2 px-3">{property.location}</td>
              <td className="py-2 px-3">
                <span className={`px-2 py-1 rounded text-sm ${property.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {property.status}
                </span>
              </td>
              <td className="py-2 px-3 text-center flex justify-center gap-2">
                <button title="View" className="text-blue-600"><FiEye /></button>
                <button title="Edit" className="text-green-600"><FiEdit /></button>
                <button title="Delete" className="text-red-600" onClick={() => handleDelete(property._id)}><FiTrash2 /></button>
                {property.status !== 'Approved' && (
                  <button title="Approve" className="text-purple-600" onClick={() => handleApprove(property._id)}><FiCheckCircle /></button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
