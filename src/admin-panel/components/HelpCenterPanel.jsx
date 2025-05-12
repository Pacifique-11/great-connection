// src/admin-panel/components/HelpCenterPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from "../../api/axiosClient";

export default function HelpCenterPanel() {
  const [supportData, setSupportData] = useState({
    contactEmail: '',
    supportPhone: '',
    userGuideURL: '',
    termsURL: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/support')
      .then((res) => {
        setSupportData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching support data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportData({ ...supportData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/support', supportData);
      alert('Support information updated successfully!');
    } catch (err) {
      console.error("Error saving support data:", err);
      alert('Failed to save support data.');
    }
  };

  if (loading) return <div>Loading support data...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Support / Help Center Configuration</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="contactEmail"
          placeholder="Contact Email"
          value={supportData.contactEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="supportPhone"
          placeholder="Support Phone"
          value={supportData.supportPhone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="userGuideURL"
          placeholder="User Guide URL"
          value={supportData.userGuideURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="termsURL"
          placeholder="Terms and Conditions URL"
          value={supportData.termsURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Support Info
        </button>
      </form>
    </div>
  );
}
