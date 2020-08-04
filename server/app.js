var express = require('express');
var socket = require('socket.io');

var app = express();

server = app.listen(process.env.PORT || 8080,function(){
  console.log('server is running on port 5000')
  console.log(__dirname)
});

app.use(express.static(__dirname + '../'));

io = socket(server);

io.on('connection',(socket) => {
  socket.on('SEND_MESSAGE',function(data){
    console.log('emit')
    io.emit('RECEIVE_MESSAGE',data);
  })
});
