import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('chatMessage', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });
    
    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chatMessage', message); // Send message to the server
    setMessage('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="chat-window">
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
