// Handle chat events
const handleChat = (socket, io) => {
    socket.on('chatMessage', (msg) => {
      io.emit('chatMessage', msg);  // Broadcast the message to all connected clients
    });
  };
  
  // Handle document update events
  const handleDocument = (socket, io) => {
    socket.on('documentUpdate', (content) => {
      io.emit('documentUpdate', content); // Broadcast the document update to all connected clients
    });
  };
  
  module.exports = { handleChat, handleDocument };
  