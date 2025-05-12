// src/admin-panel/pages/Messages.jsx
import React from "react";

import MainLayout from '../components/MainLayout';
import InboxMessagesPanel from '../components/InboxMessagesPanel';
import BulkNotificationPanel from '../components/BulkNotificationPanel';

export default function Messages() {
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold mb-4">Messages & Notifications</h2>
      <InboxMessagesPanel />
      <BulkNotificationPanel />
    </MainLayout>
  );
}
