import React, { useState } from 'react';
import './assets/styles/service.scss';
import Chatbot from "./components/Chatbot";

export const App = () => {
  const [open, setOpen] = useState(false)
  const [newChat, setNewChat] = useState(false)

  const toggleChatbot = () => {
    if (open) {
      setNewChat(true)
    } else {
      setNewChat(false)
      setOpen(true)
    }
  }

  return (
    <div className={`service-wrapper ${open ? 'open' : ''}`}>
      <Chatbot open={open} newChat={newChat} setOpen={setOpen} />
      <div className="btn-container">
        <button onClick={toggleChatbot}>
          {open ? '새 채팅 시작하기' : '채팅 시작하기'}
        </button>
      </div>
    </div>
  );
}

export default App;
