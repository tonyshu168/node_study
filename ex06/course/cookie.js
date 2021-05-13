// const http = require('http');
// http.createServer((req, res) => {
//   const { url, headers } = req;

//   if ( url === '/favicon.ico' ) {
//     res.end('');
//     return;
//   }
//   else {
//     console.log('cookie: ', headers.cookie);
//     res.setHeader('set-cookie', 'cookie1=abc;');
//     res.end('hello cookie');
//   }
// }).listen(10086);

const http = require('http');
const session = {};

http.createServer((req, res) => {
  const sessionKey = 'sid';
  const { url, headers } = req;

  if ( url === '/favicon.ico' ) {
    res.end('');
  }
  else {
    const { cookie } = headers;

    if ( cookie && cookie.includes(sessionKey) ) {
      res.end('Come back');
      console.log('cookie: ', cookie);
      const pattern = new RegExp(`${sessionKey}=([^;]+;?\s*)`);
      const sid = pattern.exec(cookie)[1];
      console.log('session: ', sid, session, session[sid]);
    }
    else {
      const sid = (Math.random() * 9999999)|0;
      res.setHeader('set-cookie', `${sessionKey}=${sid}`);
      session[sid] = { name: 'laowang' };
      res.end('hello cookie');
    }
  }
}).listen(10086);