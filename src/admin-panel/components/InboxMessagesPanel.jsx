import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { FiTrash2, FiEdit, FiSend } from "react-icons/fi";

export default function InboxMessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    axiosClient.get("/messages")
      .then(res => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load messages", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this message?")) return;

    axiosClient.delete(`/message/${id}`)
      .then(() => {
        setMessages(prev => prev.filter(msg => msg._id !== id));
      })
      .catch(err => {
        console.error("Failed to delete", err);
        alert("Could not delete message.");
      });
  };

  const handleReply = (id) => {
    if (!replyContent) return alert("Reply cannot be empty");

    axiosClient.post(`/message/reply/${id}`, { reply: replyContent })
      .then(() => {
        alert("Reply sent!");
        setReplyContent("");
        setSelectedMessageId(null);
      })
      .catch(err => {
        console.error("Failed to reply", err);
        alert("Could not send reply.");
      });
  };

  const handleEdit = (id) => {
    axiosClient.put(`/message/${id}`, { message: editedContent })
      .then(() => {
        setMessages(prev =>
          prev.map(msg => (msg._id === id ? { ...msg, message: editedContent } : msg))
        );
        setEditingMessageId(null);
        alert("Message updated.");
      })
      .catch(err => {
        console.error("Failed to update message", err);
        alert("Update failed.");
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Inbox</h3>

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul className="divide-y">
          {messages.map((msg) => (
            <li key={msg._id} className="py-3 flex flex-col gap-2">
              <div className="flex justify-between">
                <div>
                  {editingMessageId === msg._id ? (
                    <textarea
                      className="w-full border p-2 rounded"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    <p className="font-medium">{msg.message}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    From: {msg.username} ({msg.email})
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => {
                      setEditedContent(msg.message);
                      setEditingMessageId(msg._id);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FiEdit />
                  </button>
                </div>
              </div>

              {/* Edit & Save */}
              {editingMessageId === msg._id && (
                <button
                  className="self-end text-sm text-white bg-blue-600 px-3 py-1 rounded"
                  onClick={() => handleEdit(msg._id)}
                >
                  Save
                </button>
              )}

              {/* Reply Form */}
              <div className="mt-2">
                {selectedMessageId === msg._id ? (
                  <>
                    <textarea
                      className="w-full border rounded p-2"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply..."
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => handleReply(msg._id)}
                      >
                        <FiSend className="inline-block mr-1" /> Send
                      </button>
                      <button
                        className="text-gray-500 underline"
                        onClick={() => setSelectedMessageId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="text-blue-600 text-sm underline"
                    onClick={() => setSelectedMessageId(msg._id)}
                  >
                    Reply
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
