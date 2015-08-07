var net = require('net'),
    listener = require('./listen-one-in-range'),
    server = net.createServer();

listener(8000, 8080, server, function(port) {
    console.log('Server listening on port ' + port);
});
