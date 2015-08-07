'use strict';

var assert = require('assert');


function tryPort(ports, listenFn, errorMessage, cb) {
    var index, port, server;

    if (ports.length < 1) {
        throw new Error(errorMessage);
    }

    index = Math.floor(Math.random()*ports.length);
    port = (ports.splice(index, 1))[0];
    server = listenFn(port);

    server.on('listening', function() {
        server.removeAllListeners(['error', 'listening']);
        cb(server, port);
    });

    server.on('error', function () {
        server.removeAllListeners(['error', 'listening']);
        tryPort(ports, listenFn, errorMessage, cb);
    });
}

module.exports = function(from, to, listenFn, cb){
    var ports = [],
        port = from,
        errorMessage = 'No free port found in range [' + from + ', ' + to + ']';

    assert.equal(typeof from, 'number', 'First argument should be lowest port in range');
    assert.equal(typeof to, 'number', 'Second argument should be highest port in range');
    assert.equal(typeof listenFn, 'function', 'Third argument should be the listen function');

    for (; port <= to; port++) {
        ports.push(port);
    }

    tryPort(ports, listenFn, errorMessage, cb);
};
