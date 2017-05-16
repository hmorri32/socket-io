const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const io      = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});

io.on('connection', function(socket) {
  console.log('connected like a motherfucker.');
});

io.on('connection', function(socket) {
  console.log('somebody once told me...')
  socket.broadcast.emit('message', { user: 'turingbot', text: 'New Connection' });

  // io.sockets.emit('message', { user: 'turingbot', text: 'hello world'})

  socket.on('message', function(channel, message) {
    io.sockets.emit('message', message)
  })
  
  socket.on('disconnect', function() {
  socket.broadcast.emit('message', { user: 'turingbot', text: 'someone has disconnected' });
  })
})



// io.on('connection', function (socket) {

//   var interval = setInterval(function () {
//     socket.emit('message', {user: 'turingbot', text: 'I am a banana.'});
//   }, 1000);

//   socket.on('disconnect', function () {
//     clearInterval(interval);
//   });
// });