
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/socketio', routes.socketio);
app.get('/users', user.list);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/*
io.set('transports', [
    'websocket'
  , 'xhr-polling'
  , 'jsonp-polling'
]);
*/

io.sockets.on('connection', function (socket) {
  socket.emit('news', "you are "+socket.id);
  io.sockets.emit('news', 'new user connected!');

  //for some reason this below line doesn't work..
  //http://stackoverflow.com/questions/6477770/socket-io-how-to-broadcast-messages-on-a-namespace
  //socket.broadcast.emit('news', {h:'blag'});

  socket.on('position', function (data) {
    console.log(data);
    socket.broadcast.emit('position', data);

    if (data.t != 0) socket.emit('latency', data.t);
  });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});
