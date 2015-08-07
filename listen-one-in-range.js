'use strict';

var assert = require('assert');


function tryPort(ports, server, errorMessage, cb) {
    var index, port;

    if (ports.length < 1) {
        return cb(new Error(errorMessage));
    }

    index = Math.floor(Math.random() * ports.length);
    port = (ports.splice(index, 1))[0];

    server.listen(port);

    function onListening() {
        removeListeners();
        return cb(null, port);
    }

    function onError() {
        removeListeners();
        tryPort(ports, server, errorMessage, cb);
    }

    function removeListeners() {
        server.removeListener('listening', onListening);
        server.removeListener('error', onError);
    }

    server.on('listening', onListening);
    server.on('error', onError);
}

module.exports = function(from, to, server, cb){
    var ports = [],
        port = from,
        errorMessage = 'No free port found in range [' + from + ', ' + to + ']';

    try {
        assert.equal(typeof from, 'number', 'First argument should be lowest port in range');
        assert.equal(typeof to, 'number', 'Second argument should be highest port in range');
        assert(server, 'Third argument should be the server');
        assert.equal(typeof server, 'object', 'Third argument should be the server');
        assert(server.listen, 'object', 'Serves should have a listen function');
    } catch (err) {
        return cb(err);
    }

    for (; port <= to; port++) {
        ports.push(port);
    }

    tryPort(ports, server, errorMessage, cb);
};
