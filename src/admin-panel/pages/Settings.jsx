// src/pages/Settings.jsx
import React from 'react';
import MainLayout from '../components/MainLayout';
import SettingsPanel from '../components/SettingsPanel';
import FAQPanel from '../components/FAQPanel';
import HelpCenterPanel from '../components/HelpCenterPanel';

export default function Settings() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Platform Settings</h2>
      
      <HelpCenterPanel />
      <FAQPanel />
      <SettingsPanel />
    </MainLayout>
  );
}
