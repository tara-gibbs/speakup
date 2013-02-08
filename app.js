var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = '8080';

if (process.env.PORT) {
   port = process.env.PORT;
}

server.listen(port);
console.log('server listening on port ' + port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use('/js', express.static(__dirname + "/js"));
app.use('/css', express.static(__dirname + "/css"));

io.sockets.on('connection', function (socket) {
  socket.on('speakup', function (data) {
    socket.broadcast.emit('flash_speakup');
    socket.emit('flash_speakup');
  });
});
