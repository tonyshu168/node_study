(async () => {
  const { MongoClient } = require('mongodb');
  const client = new MongoClient('mongodb://localhost:27017', {
    // userNewUrlParser这个属性会在url里识别验证用户所需的db
    userNewUrlParser: true
  });

  let ret;
  ret = await client.connect();
  console.log('ret:', ret);

  const db = client.db('test');
  const fruits = db.collection('fruits');

  // add document
  ret = await fruits.insertOne({ name: '芒果', price: 20.1 });
  console.log('insert success', JSON.stringify(ret));

  // search document
  ret = await fruits.findOne();
  console.log('find document:', ret);

  // update document
  // update operator: $set
  ret = await fruits.updateOne({ name: '芒果' }, {
    $set: { name: '苹果' }
  });
  console.log('update document:', JSON.stringify(ret.result));

  // delete document
  ret = await fruits.deleteOne({name: '苹果' });

  await fruits.deleteMany();

  client.close();
})()
