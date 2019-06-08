import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongo-mock';
import { ObjectID } from 'mongodb';
import isUrl from 'is-url';

import jobWorker from './jobWorker';

mongodb.max_delay = 0;
const MongoClient = mongodb.MongoClient;
MongoClient.persist="data.js";
const mongourl = 'mongodb://localhost:5050/dropproject';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000;

app.get('/api/v1/all_jobs', (req, res) => {
  MongoClient.connect(mongourl)
    .then(conn => {
      return conn.collection('urlJobs')
      .find({}, {_id: 1, url: 1, status: 1})
      .toArray()
      .then(result => {
        res.status(200).send({
          message: 'All jobs',
          jobs: result
        })
      })
      .then(() => conn.close())
    })
});

app.post('/api/v1/new_job', async (req, res) => {
  const { url } = req.body;
  if(!url && typeof url === 'string') {
    return res.status(400).send({
      success: false,
      message: 'url is required'
    });
  } else if(!isUrl(url)) {
    return res.status(400).send({
      success: false,
      message: 'Invalid url. Make sure it begins with http/https.'
    });
  }

  MongoClient.connect(mongourl)
    .then(conn => {
      return conn.collection('urlJobs')
      .insertOne({ url : url, status: 'created' })
      .then(result => {
        return res.status(201).send({
          success: true,
          message: 'job added successfully',
          result: result.ops[0]
        })
      })
      .then(() => conn.close())
    })

    jobWorker.fetchHTML(url);
})

app.get('/api/v1/find_by_id', (req, res) => {
  MongoClient.connect(mongourl)
    .then(conn => {
      return conn.collection('urlJobs')
      .findOne({ _id: ObjectID(req.query.id) })
      .then(result => {
        const { status, url, html } = result;
        res.status(200).send({
          message: 'job retrieved successfully',
          status,
          url,
          html
        })
      })
      .then(() => conn.close())
    })
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});