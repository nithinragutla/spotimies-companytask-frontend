import React from "react";
import ChatBox from "../components/chatBox";
import FAQManager from "../components/FAQManager";
import "./ChatPage.css"; // create this file

const ChatPage = () => {
  return (
    <div className="chat-page">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        AI Customer Support
      </h1>

      <div className="chat-layout">
        {/* Left: FAQ Upload + Manual FAQ */}
        <div className="faq-section">
          <FAQManager />
        </div>

        {/* Right: Chat */}
        <div className="chat-section">
          <h2>AI Support Chat</h2>
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
