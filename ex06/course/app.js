// const Koa = require('koa');
// const app = new Koa();
// const session = require('koa-session');

// app.keys = ['some secret'];

// const SESS_CONFIG = {
//   key: 'kkb:sess',
//   maxAge: 86400000,        // expire time
//   httpOnly: true,          // 仅服务器修改有效
//   signed: true             // sign cookie
// };

// app.use(session(SESS_CONFIG, app));

// app.use(ctx => {
//   if ( ctx.path === '/favico.ico') return;

//   let n = ctx.session.count || 0;
//   ctx.session.count = ++n;
//   ctx.body = '第' + n + '次访问';
// });

// app.listen(10086);

const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const redisStore = require('koa-redis');
const redis = require('redis');
const redisClient = redis.createClient(6379, 'localhost');

const wrapper = require('co-redis');
const client = wrapper(redisClient);

app.keys = ['some secret'];

const SESS_CONFIG = {
  key: 'kkb:sess',
  // maxAge: 86400000,        // expire time
  // httpOnly: true,          // 仅服务器修改有效
  // signed: true,             // sign cookie
  store: redisStore({ client })
};

app.use(session(SESS_CONFIG, app));

app.use(ctx => {
  // redisClient.keys('*', (err, keys) => {
  //   console.log('keys: ', keys);
  //   keys.forEach(key => {
  //     redisClient.get(key, (err, val) => {
  //       console.log(val);
  //     })
  //   })
  // });

  if ( ctx.path === '/favicon.ico' ) return;

  let n = ctx.session.count || 0;
  ctx.session.count = ++n;
  ctx.body = '第' + n + '次访问';
});

app.listen(10086);