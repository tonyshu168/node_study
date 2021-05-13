const { EventEmitter } = require('events');

module.exports = class Connection {
  constructor( ) {
    this.emitter = new EventEmitter();
  }

  onConn(callback) {
    this.emitter.on('connection', callback);
  }

  connection(arg) {
    this.emitter.emit('connection', arg);
  }
};
