// src/admin-panel/components/FAQPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../api/axiosClient';

export default function FAQPanel() {
  const [faqs, setFaqs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  const loadFAQs = () => {
    axios.get('/faqs')
      .then((res) => {
        setFaqs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching FAQs:", err);
      });
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  const handleAddFAQ = (e) => {
    e.preventDefault();
    axios.post('/faqs', newFAQ)
      .then(() => {
        setNewFAQ({ question: '', answer: '' });
        loadFAQs();
        alert('FAQ added successfully!');
      })
      .catch((err) => {
        console.error("Error adding FAQ:", err);
        alert('Failed to add FAQ.');
      });
  };

  const handleDeleteFAQ = (id) => {
    axios.delete(`/faqs/${id}`)
      .then(() => {
        loadFAQs();
        alert('FAQ deleted successfully!');
      })
      .catch((err) => {
        console.error("Error deleting FAQ:", err);
        alert('Failed to delete FAQ.');
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">FAQs Management</h3>
      <form onSubmit={handleAddFAQ} className="space-y-4 mb-6">
        <input
          name="question"
          placeholder="Enter the question"
          value={newFAQ.question}
          onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="answer"
          placeholder="Enter the answer"
          value={newFAQ.answer}
          onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add FAQ
        </button>
      </form>

      <div>
        <h4 className="text-lg font-semibold mb-4">Existing FAQs</h4>
        {faqs.map((faq) => (
          <div key={faq._id} className="border-b py-4">
            <h5 className="font-medium">{faq.question}</h5>
            <p>{faq.answer}</p>
            <button
              onClick={() => handleDeleteFAQ(faq._id)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              Delete FAQ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
