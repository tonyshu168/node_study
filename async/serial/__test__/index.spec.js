const { callback, promise, generator, asyncAwait, event } = require('../index');

// test('callback', done => {
//   callback();

//   setTimeout(done, 1000);
// })

// test('Promise', done => {
//   promise();

//   setTimeout(done, 1000);
// })

// test('Generator', done => {
//   generator();

//   setTimeout(done, 1000);
// })

// test('AsyncAwait', done => {
//   asyncAwait();

//   setTimeout(done, 1000);
// })

test('event', done => {
  event();

  setTimeout(done, 1000);
})