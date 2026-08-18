import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { FiEdit, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';

export default function PropertyTable() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState({ location: '', type: '', status: '' });
  const navigate = useNavigate();

  // Fetch properties from backend
  useEffect(() => {
    axiosClient.get('/get-properties')
      .then(res => {
        const data = Array.isArray(res.data) 
          ? res.data 
          : (res.data.properties || res.data.data || []);
        setProperties(data);
      })
      .catch(err => console.error("Error fetching table properties:", err));
  }, []);
   
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axiosClient.delete(`/delete-property/${id}`);
        setProperties(prev => prev.filter(p => p._id !== id && p.id !== id));
      } catch (err) {
        console.error("Error deleting property:", err);
        alert("Failed to delete property.");
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosClient.put(`/update-property/${id}`, { status: 'Approved' });
      setProperties(prev =>
        prev.map(p => (p._id === id || p.id === id) ? { ...p, status: 'Approved' } : p)
      );
    } catch (err) {
      console.error("Error approving property:", err);
      alert("Failed to approve property.");
    }
  };

  const handleView = (id) => {
    navigate(`/admin-panel/property/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/edit-property/${id}`);
  };

  const filtered = properties.filter(p =>
    (!filter.location || p.location === filter.location) &&
    (!filter.type || p.type === filter.type) &&
    (!filter.status || p.status === filter.status)
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Property Listings</h3>
        <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
          Total: {filtered.length}
        </span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <select 
          onChange={e => setFilter({ ...filter, location: e.target.value })} 
          className="p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Locations</option>
          <option value="Kigali">Kigali, Gikondo</option>
          <option value="Gasabo">Gasabo, Kigali</option>
          <option value="Karongi">Karongi, Rwanda</option>
          <option value="Musanze">Musanze, Rwanda</option>
        </select>
        <select 
          onChange={e => setFilter({ ...filter, type: e.target.value })} 
          className="p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Types</option>
          <option value="House">House</option>
          <option value="Other">Other</option>
        </select>
        <select 
          onChange={e => setFilter({ ...filter, status: e.target.value })} 
          className="p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Type</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">
                  No properties match the selected filters.
                </td>
              </tr>
            ) : (
              filtered.map((property) => {
                const propertyId = property._id || property.id;
                return (
                  <tr key={propertyId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{property.title}</td>
                    <td className="py-3 px-4 text-gray-600">{property.type}</td>
                    <td className="py-3 px-4 text-gray-600">{property.location}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        property.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {property.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          title="View" 
                          onClick={() => handleView(propertyId)}
                          className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                        >
                          <FiEye size={16} />
                        </button>
                        <button 
                          title="Edit" 
                          onClick={() => handleEdit(propertyId)}
                          className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button 
                          title="Delete" 
                          onClick={() => handleDelete(propertyId)}
                          className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        {property.status !== 'Approved' && (
                          <button 
                            title="Approve" 
                            onClick={() => handleApprove(propertyId)}
                            className="p-1.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
                          >
                            <FiCheckCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}