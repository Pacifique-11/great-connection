// src/pages/UserProfilePage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Topbar from '../components/Topbar';

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    axiosClient.get('/users')
      .then(res => {
        const found = res.data.find(u => u.id.toString() === id);
        if (found) {
          setUser(found);
          setFormData({ name: found.name, email: found.email });
        }
      })
      .catch(err => console.error('Error loading user profile', err));
  }, [id]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axiosClient.put(`/user/${user.id}`, formData)
      .then(res => {
        alert('User info updated!');
        setUser(prev => ({ ...prev, ...formData }));
        setEditing(false);
      })
      .catch(err => {
        console.error('Update error', err);
        alert('Failed to update user.');
      });
  };

  const handlePromoteToAdmin = () => {
    axiosClient.put(`/user/${user.id}/role`, { role: 'admin' })
      .then(res => {
        alert('User promoted to admin');
        setUser(prev => ({ ...prev, role: 'admin' }));
      })
      .catch(err => {
        console.error('Promote error', err);
        alert('Failed to promote user');
      });
  };

  if (!user) return <p className="p-4">Loading user profile...</p>;

  return (
    <>
    <Topbar />
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          {editing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          {editing ? (
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          ) : (
            <p>{user.email}</p>
          )}
        </div>

        <p><strong>Role:</strong> {user.role}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={user.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
            {user.status}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
  {editing ? (
    <>
      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
      <button onClick={() => setEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
    </>
  ) : (
    <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit Info</button>
  )}

  {user.role !== 'admin' && (
    <button onClick={handlePromoteToAdmin} className="bg-green-600 text-white px-4 py-2 rounded">Promote to Admin</button>
  )}

  <button onClick={handleDeleteUser} className="bg-red-600 text-white px-4 py-2 rounded">Delete User</button>
</div>

    </div>
    </>
  );
}
