import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FAQManager.css";
import { BASE_URL } from "../utils/constants";

const FAQManager = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  // Fetch all FAQs
  const fetchFAQs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/faqs/all`);
      setFaqs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add FAQ manually
  const handleAddFAQ = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/faqs/add`, { question, answer });
      setQuestion("");
      setAnswer("");
      fetchFAQs();
    } catch (err) {
      console.error(err);
    }
  };

  // Upload PDF
  const handleUploadPDF = async (e) => {
    e.preventDefault();
    if (!pdfFile) return alert("Please select a PDF file first");

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      await axios.post(`${BASE_URL}/api/faqs/upload-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPdfFile(null);
      fetchFAQs();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <div>
      <h2>FAQ Management</h2>

      {/* PDF Upload Form */}
      <form onSubmit={handleUploadPDF} className="faq-form" >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <button type="submit" className="btn btn-green">
          Upload PDF
        </button>
      {/* Manual FAQ Form */}
      <form onSubmit={handleAddFAQ} className="faq-form">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-blue">
          Add FAQ
        </button>
      </form>

      </form>

      {/* FAQ List */}
      <div className="faq-list">
        <h3>All FAQs</h3>
        <ul>
          {faqs.map((faq) => (
            <li key={faq._id}>
              <p><strong>Q:</strong> {faq.question}</p>
              <p><strong>A:</strong> {faq.answer}</p>
              {faq.source && <span>Source: {faq.source}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQManager;
