import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { FiEdit, FiTrash2, FiEye, FiCheckCircle } from 'react-icons/fi';

export default function AssetTable() {
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState({ type: '', status: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/property-asset')
      .then(res => {
        const data = Array.isArray(res.data) 
          ? res.data 
          : (res.data.assets || res.data.data || []);
        setAssets(data);
      })
      .catch(err => console.error("Error fetching assets table:", err));
  }, []);
   
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axiosClient.delete(`/property-asset/${id}`);
        setAssets(prev => prev.filter(a => a._id !== id && a.id !== id));
      } catch (err) {
        console.error("Error deleting asset:", err);
        alert("Failed to delete asset.");
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosClient.put(`/property-asset/${id}`, { status: 'Available' });
      setAssets(prev =>
        prev.map(a => (a._id === id || a.id === id) ? { ...a, status: 'Available' } : a)
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  const handleView = (id) => {
    navigate(`/asset/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/edit-asset/${id}`);
  };

  const filtered = assets.filter(a =>
    (!filter.type || a.type === filter.type) &&
    (!filter.status || a.status === filter.status)
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Assets & Goods Inventories</h3>
        <span className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-medium">
          Total: {filtered.length}
        </span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <select 
          onChange={e => setFilter({ ...filter, type: e.target.value })} 
          className="p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Categories</option>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Land">Land</option>
          <option value="Clothes">Clothes</option>
          <option value="Other">Other</option>
        </select>
        <select 
          onChange={e => setFilter({ ...filter, status: e.target.value })} 
          className="p-2.5 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Statuses</option>
          <option value="Rent">For Rent</option>
          <option value="Sale">For Sale</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Type</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">
                  No assets match your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const itemId = item._id || item.id;
                return (
                  <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{item.name}</td>
                    <td className="py-3 px-4 text-gray-600">{item.type}</td>
                    <td className="py-3 px-4 text-gray-600 font-semibold">{item.price}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Available' || item.status === 'Sale' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          title="View" 
                          onClick={() => handleView(itemId)}
                          className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                        >
                          <FiEye size={16} />
                        </button>
                        <button 
                          title="Edit" 
                          onClick={() => handleEdit(itemId)}
                          className="p-1.5 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button 
                          title="Delete" 
                          onClick={() => handleDelete(itemId)}
                          className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        {item.status === 'Pending' && (
                          <button 
                            title="Approve / Make Available" 
                            onClick={() => handleApprove(itemId)}
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