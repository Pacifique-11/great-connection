// src/admin-panel/components/UserManagementPanel.jsx
import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { FiEye, FiMail, FiSlash } from 'react-icons/fi';

const roles = ['seller', 'buyer', 'admin'];

export default function UserManagementPanel() {
  const [users, setUsers] = useState([]);
  const [activeRole, setActiveRole] = useState('seller');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    axiosClient.get('/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setLoading(false);
      });
  }, []);

  // Toggle Active/Blocked Status
  const handleToggleStatus = (id) => {
    axiosClient.put(`/user/${id}/status`)
      .then(res => {
        const updatedStatus = res.data.status;
        console.log('Updated status:', updatedStatus);
        setUsers(prev =>
          prev.map(user => user.id === id ? { ...user, status: updatedStatus } : user)
        );
      })
      .catch(err => {
        console.error('Error updating status:', err);
        alert('Failed to update user status.');
      });
  };

  // Send a message to user
  const handleSendMessage = (user) => {
    const message = prompt(`Enter message for ${user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}:`);
    if (!message) return;

    axiosClient.post(`/message/${user._id}`,  message )
      .then(res => alert(res.data.message))
      .catch(err => {
        console.error('Failed to send message:', err);
        if(user.role != 'admin') {
          alert('Unauthorized to send message. Only admin.');
        } else {
          alert('Error sending message.');
        }
      });
  };

  const filteredUsers = users.filter(user => user.role === activeRole);

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      {/* Tabs */}
      <div className="flex gap-4 border-b mb-4">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`pb-2 px-3 font-medium capitalize ${
              activeRole === role ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            {role}s
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full text-left border-t">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 border-b">Name</th>
              <th className="py-2 px-3 border-b">Email</th>
              <th className="py-2 px-3 border-b">Status</th>
              <th className="py-2 px-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}</td>
                <td className="py-2 px-3">{user.email}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-3">
                  <div className="flex justify-center gap-3">
                    {/* View Profile */}
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="View User Details"
                      aria-label="View User"
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      <FiEye size={18} />
                    </button>

                    {/* Send Message */}
                    <button
                      className="text-green-600 hover:text-green-800 transition"
                      title="Send Message"
                      aria-label="Message User"
                      onClick={() => handleSendMessage(user)}
                    >
                      <FiMail size={18} />
                    </button>

                    {/* Block / Unblock */}
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      title={user.status === 'Active' ? 'Block User' : 'Unblock User'}
                      aria-label="Toggle User Status"
                      onClick={() => handleToggleStatus(user._id)}
                    >
                      <FiSlash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}