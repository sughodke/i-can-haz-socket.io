//var socket = io.connect('http://localhost', 

var socket = io.connect(location.origin.replace(/^http/, 'ws'),
               { 
                 transports:['websocket'] 
               }
             );
