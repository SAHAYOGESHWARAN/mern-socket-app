const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');
const docRoutes = require('./routes/docRoutes');
const { handleChat, handleDocument } = require('./socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/workspace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Routes
app.use('/api/chat', chatRoutes);
app.use('/api/doc', docRoutes);

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('User connected');
  handleChat(socket, io);   // Handle chat events
  handleDocument(socket, io); // Handle document events

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
