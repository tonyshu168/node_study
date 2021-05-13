class EventEmitter {
  constructor( ) {
    this.handler = {}
  }

  on( eventName, callback ) {
    if ( !this.handles ) {
      this.handles = {};
    }

    if ( !this.handles[eventName] ) {
      this.handles[eventName] = [];
    }

    this.handles[eventName].push(callback);
  }

  emit(eventName, ...arg) {
    if ( this.handles[eventName] ) {
      for ( let i = 0; i < this.handles[eventName].langth; i++ ) {
        this.hanldes[eventName][i](...arg);
      }
    }
  }
}

const event = new EventEmitter();

event.on('some_event', num => {
  console.log('some_event event handler: ' + num);
})

let num = 0;

const timer = setInterval(() => {
  if ( num > 6 ) {
    clearInterval(timer);
  }
  else {
    event.emit('some_event', num++ );
  }
}, 1000)