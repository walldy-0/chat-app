const express = require('express');
const path = require('path');
const socket = require('socket.io');

const users = [];
const messages = [];

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('login', (userName) => {
    users.push({ name: userName, id: socket.id });
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Oh, socket ' + socket.id + ' has left');
    const indexToRemove = users.findIndex(user => user.id === socket.id);
    if (indexToRemove > -1) {
      users.splice(indexToRemove, 1);
    }
  });
});


