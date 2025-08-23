import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import "./chatbox.css";
import { ChatContext } from "../context/chatcontext";
import { BASE_URL } from "../utils/constants";

const USER_ID = "123"; // You can make this dynamic later

const ChatBox = () => {
  const { messages, setMessages, loading, setLoading } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/chat/history/${USER_ID}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/chat/send`, {
        userId: USER_ID,
        message: input
      });
      console.log(res.data);
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
      setInput("");
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "bot", text: "Error: could not get response" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
