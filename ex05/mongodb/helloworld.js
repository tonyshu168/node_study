const log = (text, json) => {
  console.log(text, JSON.stringify(json, null, 2));
}

setTimeout(async () => {
  const { MongoClient: MongoDB } = require('mongodb');
  const client = new MongoDB('mongodb://localhost:27017',
    {useNewUrlParser: true}
  );
  let ret;
  
  ret = await client.connect();
  const db = client.db('test');

  // const fruits = db.collection('fruits');
  // ret = await fruits.insertOne({
  //   name: '芒果'，
  //   price: 6.8
  // });
  // log('插入成功', ret);

  // ret = await fruits.findOne();
  // console.log('find: ', ret);

  // ret = await fruits.updateOne({name: '芒果'}, {
  //   $set: {name: '苹果'}
  // });
  // console.log('update', ret.result);

  // ret = await fruits.deleteOne({name: '苹果'});

  // await fruits.deleteMany();

  const stations = db.collection('stations');

  await stations.insertMany([
    { name: '天安门东', loc: [116.407851, 39.91408] },
    { name: '天安门西', loc: [116.398056, 39.913723] },
    { name: '王府井', loc: [116.417809, 39.91435] }
  ]);
  await stations.createIndex({ loc: '2dsphere' });
  r = await stations.find({
    loc: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [116.403847, 39.915526]
        },
        $maxDistance: 1000
      }
    }
  }).toArray();
  console.log('天安门附近地铁站', r);

  client.close();

});