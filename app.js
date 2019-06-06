import express from 'express';
import bodyParser from 'body-parser';

import db from './db/db'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 5000;

app.get('/api/v1/jobs', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'jobs retrieved successfully',
    jobs: db
  })
});

app.post('/api/v1/new_job', (req, res) => {
  console.log('REQUEST', req);
  if(!req.body.url) {
    return res.status(400).send({
      success: 'false',
      message: 'url is required'
    });
  }

  const newJob = {
    id: db.length + 1,
    url: req.body.url,
    status: 'created'
  }

  db.push(newJob);

  return res.status(201).send({
    success: 'true',
    message: 'job added successfully',
    newJob
  })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});