import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import axiosClient from '../../api/axiosClient'; 

export default function AssetTable() {
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState({ type: '', status: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10; // Items per page
  const navigate = useNavigate();

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        ...(filter.type && { type: filter.type }),
        ...(filter.status && { status: filter.status })
      };

      const res = await axiosClient.get('/property-asset', { params });
      
      // Handles both array responses and structured pagination responses from backend
      const responseData = res.data;
      if (Array.isArray(responseData)) {
        setAssets(responseData);
        setTotalPages(1);
        setTotalItems(responseData.length);
      } else {
        setAssets(responseData.assets || responseData.data || []);
        setTotalPages(responseData.totalPages || 1);
        setTotalItems(responseData.total || 0);
      }
    } catch (err) {
      console.error("Error fetching assets table:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [page, filter]);

  // Reset to page 1 whenever filters change
  const handleFilterChange = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };
   
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axiosClient.delete(`/property-asset/${id}`);
        setAssets(prev => prev.filter(a => a._id !== id && a.id !== id));
        fetchAssets(); // Refresh table counts
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Assets & Goods Inventories</h3>
        <span className="text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-medium">
          Total: {totalItems}
        </span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <select 
          value={filter.type}
          onChange={e => handleFilterChange('type', e.target.value)} 
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
          value={filter.status}
          onChange={e => handleFilterChange('status', e.target.value)} 
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
      <div className="overflow-x-auto min-h-[300px]">
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
            {loading ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-400">
                  Loading assets...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-400">
                  No assets match your criteria.
                </td>
              </tr>
            ) : (
              assets.map((item) => {
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

      {/* Pagination Bar */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
          <p className="text-sm text-gray-500">
            Page <span className="font-semibold text-gray-800">{page}</span> of <span className="font-semibold text-gray-800">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <FiChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}