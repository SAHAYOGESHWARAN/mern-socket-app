import React, { useState, useEffect } from 'react';
import socket from '../services/socket';

function DocumentEditor() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Listen for document updates from the server
    socket.on('documentUpdate', (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off('documentUpdate');
    };
  }, []);

  const handleChange = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);
    socket.emit('documentUpdate', updatedContent); // Send document update to the server
  };

  return (
    <div>
      <h2>Collaborative Document Editor</h2>
      <textarea value={content} onChange={handleChange} rows="10" cols="30" />
    </div>
  );
}

export default DocumentEditor;
