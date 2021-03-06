const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const path = require('path');

require('./mongoose');
const UserModel = require('./models/user');

// mock session
const session = { sid: { userId: '5c1a2dce951e9160f0d8573b' } };

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

// 查询购物车数据
app.get('/api/cart', async (req, res) => {
  const data = await UserModel.getCart(session.sid.userId);
  res.send({ok: 1, data});
});

app.post('/api/cart', async (req, res) => {
  await UserModel.setCart(session.sid.userId, req.body.cart);
  res.send({ok: 1});
});

app.listen(3000);
