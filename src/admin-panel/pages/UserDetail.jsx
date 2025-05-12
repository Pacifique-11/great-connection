import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Topbar from '../components/Topbar';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosClient.get(`/user/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        setError('User not found or failed to load.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading user data...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    
    < >
    <Topbar />
    <div className="max-w-3xl mx-auto mt-32 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">User Details</h2>
      <div className="space-y-3 text-gray-800">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> <span className={`font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{user.status}</span></p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mt-6">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
    </div>
    </>
    

  );
}
