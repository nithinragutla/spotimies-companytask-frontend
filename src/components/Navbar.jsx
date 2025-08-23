import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import FAQPage from "./pages/FAQPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Router>
  );
}

export default App;
