
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.socketio = function(req, res){
  res.render('socketio', { title: 'Express' });
};
