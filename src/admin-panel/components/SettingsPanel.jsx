// src/admin-panel/components/SettingsPanel.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';

export default function SettingsPanel() {
  const [formData, setFormData] = useState({
    contactEmail: '',
    logoURL: '',
    footerText: '',
    termsURL: '',
    privacyURL: '',
    maintenanceMode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing settings from backend
  useEffect(() => {
    axiosClient.get('/settings')
      .then((res) => {
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data,
          }));
        }
      })
      .catch((err) => {
        console.error("Error fetching settings:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosClient.put('/settings', formData);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error("Error saving settings:", err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Platform Configuration</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="contactEmail"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="logoURL"
          placeholder="Logo URL"
          value={formData.logoURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="footerText"
          placeholder="Footer Text"
          value={formData.footerText}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="termsURL"
          placeholder="Terms & Conditions URL"
          value={formData.termsURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="privacyURL"
          placeholder="Privacy Policy URL"
          value={formData.privacyURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={formData.maintenanceMode}
            onChange={handleChange}
          />
          <span>Enable Maintenance Mode</span>
        </label>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
