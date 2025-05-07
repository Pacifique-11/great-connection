// src/components/FAQSection.jsx
import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const staticFAQs = [
    {
      question: "What services do you offer?",
      answer: "We offer web development, digital marketing, and custom software solutions."
    },
    {
      question: "How can I get in touch with support?",
      answer: "You can contact us via our contact page or email us at support@ourwebsite.com."
    },
    {
      question: "Do you provide refunds?",
      answer: "Yes, we offer a 30-day refund policy on all our services."
    },
    {
      question: "How can I track my orders?",
      answer: "You can track your orders through your account dashboard under 'Order History'."
    }
  ];

  // Fetch FAQs from the back-end when the component is mounted
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axiosClient.get('/faq');  // Adjust to your API endpoint
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="faq-section py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        {/* Static FAQs */}
        <div className="static-faqs mb-10">
          {staticFAQs.map((faq, index) => (
            <div key={index} className="faq-item mb-4 p-4 bg-white rounded shadow">
              <h4 className="text-lg font-semibold">{faq.question}</h4>
              <p className="mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Dynamic FAQs from API */}
        <div className="dynamic-faqs">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq._id} className="faq-item mb-4 p-4 bg-white rounded shadow">
                <h4 className="text-lg font-semibold">{faq.question}</h4>
                <p className="mt-2">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p>No Other FAQs available at this moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
