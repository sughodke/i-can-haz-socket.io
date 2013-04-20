
var socket = io.connect('http://localhost');
var canvas, ctx;

socket.on('news', function (data) {
  console.log(data);
  $('.bb').append('<pre>'+data+'</pre>')
});


socket.on('position', function (data) {
  if (data.e == 'down')
    ctx.moveTo(data.x, data.y);
  else {
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.moveTo(data.x, data.y);
  }
});

socket.on('latency', function (data) {
  var curtime = new Date().getMilliseconds();
  $('.aa').html(curtime - data);
});


function sendPosition (e, x, y) {
  var curtime;

  if (!$('.ping').is(':checked')) curtime = 0;
  else curtime = new Date().getMilliseconds();

  socket.emit('position', {'t': curtime, 'e': e, 'x': x, 'y': y});
}

function draw() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.beginPath();

  var x;
  var y;

  canvas.onmousedown = function(e) {
    x = e.clientX;
    y = e.clientY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    ctx.moveTo(x, y);
    sendPosition('down', x, y)
  }

  canvas.onmouseup = function(e) {
    x = null;
    y = null;
  }

  canvas.onmousemove = function(e) {
    if (x == null || y == null) {
      return;
    }
    x = e.clientX;
    y = e.clientY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
    sendPosition('move', x, y)
  }
};