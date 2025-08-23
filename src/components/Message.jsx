import React from "react";
import "./message.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender === "user" ? "user" : "bot"}`}>
      {text}
    </div>
  );
};

export default Message;
