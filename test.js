var net = require('net'),
    listener = require('./listen-any-in-range'),
    server = net.createServer();

listener(8000, 8080, server.listen.bind(server), function(server, port) {
    console.log('Server listening on port ' + port);
});
