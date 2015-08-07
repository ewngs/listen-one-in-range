var net = require('net'),
    listener = require('./listen-one-in-range'),
    server = net.createServer();

listener(8000, 8000, server, function(err, port) {
    if (err) {
        return console.log(err.message);
    }

    console.log('Server listening on port ' + port);
});
