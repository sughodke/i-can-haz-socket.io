var socket = io.connect(location.origin.replace(/^http/, 'ws'),
               { 
                 transports:['xhr-polling'] 
               }
             );
