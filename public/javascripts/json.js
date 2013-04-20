var socket = io.connect('http://localhost', 
               { 
                 transports:['jsonp-polling'] 
               }
             );
