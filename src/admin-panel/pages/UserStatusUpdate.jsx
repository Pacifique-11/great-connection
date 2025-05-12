import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Topbar from '../components/Topbar';

export default function UserStatusUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    axiosClient.get(`/user/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user.');
        setLoading(false);
      });
  }, [id]);

  const toggleStatus = () => {
    if (!user) return;
    setStatusUpdating(true);
    axiosClient.put(`/user/${user._id}/status`)
      .then(res => {
        setUser(prev => ({ ...prev, status: res.data.status }));
        setStatusUpdating(false);
      })
      .catch(err => {
        console.error('Error updating status:', err);
        alert('Failed to update user status.');
        setStatusUpdating(false);
      });
  };

  if (loading) return <div className="p-6 text-center">Loading user...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
    <Topbar />
    <div className="max-w-lg mx-auto mt-32 bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Manage User Status</h2>

      <p className="mb-2"><strong>Username:</strong> {user.username}</p>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-4">
        <strong>Status:</strong> 
        <span className={`ml-2 px-2 py-1 text-sm rounded ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {user.status}
        </span>
      </p>

      <button
        className={`px-4 py-2 rounded text-white ${user.status === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} disabled:opacity-50`}
        onClick={toggleStatus}
        disabled={statusUpdating}
      >
        {statusUpdating ? 'Updating...' : user.status === 'Active' ? 'Block User' : 'Activate User'}
      </button>

      <div className="mt-4">
        <button 
          onClick={() => navigate('/admin-panel/users')} 
          className="text-sm text-blue-500 hover:underline mt-3"
        >
          ← Go back
        </button>
      </div>
    </div>
    </>
  );
}
