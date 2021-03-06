const mongodb = require('./models/db');
mongodb.once('connect', async () => {
  const col = mongodb.col('fruits');
  // delete exist data
  await col.deleteMany();
  const data = new Array(100).fill().map((v, i) => {
    return { name: 'xxx' + i, price: i, category: Math.random() > 0.5 ? '蔬菜' : '水里' };
  })

  // insert
  await col.insertMany(data);
  console.log('test insert test data success');
});
