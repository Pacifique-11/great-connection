import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function BulkNotificationPanel() {
  const [form, setForm] = useState({ title: "", message: "" });
  const [notifications, setNotifications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axiosClient
      .get("/notifications")
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load notifications", err);
        setLoading(false);
      });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      axiosClient
        .put(`/notification/${editingId}`, form)
        .then(() => {
          setForm({ title: "", message: "" });
          setIsEditing(false);
          setEditingId(null);
          fetchNotifications();
        })
        .catch(() => alert("Failed to update notification"));
    } else {
      axiosClient
        .post("/notification", form)
        .then(() => {
          setForm({ title: "", message: "" });
          fetchNotifications();
        })
        .catch(() => alert("Failed to send notification"));
    }
  };

  const handleEdit = (notif) => {
    setForm({ title: notif.title, message: notif.message });
    setIsEditing(true);
    setEditingId(notif._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;

    axiosClient
      .delete(`/notification/${id}`)
      .then(() => {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
      })
      .catch(() => alert("Failed to delete notification"));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Notification" : "Send Bulk Notification"}</h3>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Notification Title"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Notification Message"
          className="w-full border p-2 rounded h-28"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEditing ? "Update Notification" : "Send Notification"}
        </button>
      </form>

      <h4 className="font-semibold mb-2">Recent Notifications</h4>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="divide-y text-sm">
          {notifications.map((n) => (
            <li key={n._id} className="py-3 flex justify-between items-start">
              <div>
                <p className="font-medium">{n.title}</p>
                <p>{n.message.slice(0, 60)}{n.message.length > 60 ? "..." : ""}</p>
                <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(n)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(n._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
