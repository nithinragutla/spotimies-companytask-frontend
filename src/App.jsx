import React from "react";
import ChatPage from "./pages/chatpage";
import { ChatProvider } from "./context/ChatContext";


  const App = () => {
    return (
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    );
  };

  export default App;
