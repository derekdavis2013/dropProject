import express from 'express';
import bodyParser from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

// import db from './db/db'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let mongod;
let uri;

let port;
let dbPath;
let dbName;
let con;
let db;
let col;


const PORT = 5000;

const dbSetup = async () => {
  const mongod = await new MongoMemoryServer();
  const uri = await mongod.getConnectionString();

  port = await mongod.getPort();
  dbPath = await mongod.getDbPath();
  dbName = await mongod.getDbName();
  con = await MongoClient.connect(uri, { useNewUrlParser: true });
  db = con.db(dbName);
  col = db.collection('urlJobs');
}

dbSetup();

app.get('/api/v1/jobs', (req, res) => {
  // console.log('dbName', mongod.getCollectionInfos());
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

  const newJob = await col.insertOne({ url : req.body.url, status: 'created' });

  return res.status(201).send({
    success: 'true',
    message: 'job added successfully',
    newJob: newJob.ops[0]
  })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});