  import React from "react";
  import ChatPage from "./pages/chatpage";
import { ChatProvider } from "./context/chatcontext";

  const App = () => {
    return (
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    );
  };

  export default App;
