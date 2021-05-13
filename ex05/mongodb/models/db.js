const conf = require('./conf');
const { EventEmitter } = require('events');
const { MongoClient } = require('mongodb');

class Mongodb {
  constructor( conf ) {
    this.conf = conf;
    this.emitter = new EventEmitter();
    this.client = new MongoClient(conf.url, {
      userNewUrlParser: true
    });
    this.client.connect(err => {
      if ( err ) throw err;
      console.log('connect success');
      this.emitter.emit('connect');
    });
  }

  col( colName, dbName = conf.dbName ) {
    return this.client.db(dbName).collection(colName);
  }

  once( event, cb ) {
    this.emitter.once(event, cb);
  }
}

module.exports = new Mongodb(conf);
