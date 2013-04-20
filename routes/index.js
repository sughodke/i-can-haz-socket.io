
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'I Can Haz Socket.IO', transport: 'websocket' });
};

exports.xhr = function(req, res){
  res.render('index', { title: 'I Can Haz Socket.IO', transport: 'xhr' });
};

exports.json = function(req, res){
  res.render('index', { title: 'I Can Haz Socket.IO', transport: 'json' });
};

exports.htmlfile = function(req, res){
  res.render('index', { title: 'I Can Haz Socket.IO', transport: 'htmlfile' });
};

exports.socketio = function(req, res){
  res.render('socketio', { title: 'I Can Haz Socket.IO' });
};
