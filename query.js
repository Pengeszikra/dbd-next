
let { MongoClient, ServerApiVersion } = require('mongodb');
let uri = process.env.MONGODB_URI;
if (!uri) {
  console.log("doesn't define Mongo DB URL");
  return;
}
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async () => {
  console.log('-> connected <--');
  
  const db = client.db('blog');
  const coll = db.collection('list');

  await coll.insertOne({msg: `Auto message: ${Math.random().toString(32).slice(-8)}`, sendBy:"_debug_"});
  await coll.find({}, {projection:{_id:0}}).forEach(console.log);

  client.close();

  console.log('-> closed <--');
});

