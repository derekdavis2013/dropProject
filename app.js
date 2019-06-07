import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongo-mock';

// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { MongoClient } from 'mongodb';

// // import jobWorker from './jobWorker';
// import database from './db/db';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongod;
let uri;

let port;
let dbPath;
let dbName;
let con;
// let db;
let col;

// const db = new database();

const MongoClient = mongodb.MongoClient;
MongoClient.persist="mongo.js";

const mongourl = 'mongodb://localhost:27017/dropproject';

MongoClient.connect(mongourl, {}, function(err, client) {
  var db = client.db();
  // Get the documents collection
  var collection = db.collection('urlJobs');
  // Insert some documents
  var docs = [ {a : 1}, {a : 2}, {a : 3}];
  // collection.insertMany(docs, function(err, result) {
  //   console.log('inserted',result);

  //   collection.updateOne({ a : 2 }, { $set: { b : 1 } }, function(err, result) {
  //     console.log('updated',result);

  //     collection.findOne({a:2}, {b:1}, function(err, doc) {
  //       console.log('foundOne', doc);

  //       collection.removeOne({ a : 3 }, function(err, result) {
  //         console.log('removed',result);

  //         collection.find({}, {_id:-1}).toArray(function(err, docs) {
  //           console.log('found',docs);
            
  //           function cleanup(){            
  //             var state = collection.toJSON();
  //             // Do whatever you want. It's just an Array of Objects.
  //             state.documents.push({a : 2});
              
  //             // truncate
  //             state.documents.length = 0;
              
  //             // closing connection
  //             db.close();
  //           }
            
  //           setTimeout(cleanup, 1000);
  //         });
  //       });
  //     });
  //   });
  // });
});

const PORT = 5000;

// db.init();

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'jobs retrieved successfully',
    jobs: 'the jobs'
  });
});

app.post('/api/v1/new_job', async (req, res) => {
  if(!req.body.url) {
    return res.status(400).send({
      success: 'false',
      message: 'url is required'
    });
  }

  const newJob = await db.col.insertOne({ url : req.body.url, status: 'created' });
  const result = newJob.ops[0];

  jobWorker.fetchHTML(result);

  return res.status(201).send({
    success: 'true',
    message: 'job added successfully',
    result
  })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});