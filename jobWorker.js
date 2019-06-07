import request from 'request';
import mongodb from 'mongo-mock';

mongodb.max_delay = 0;
const MongoClient = mongodb.MongoClient;
MongoClient.persist="data.js";
const mongourl = 'mongodb://localhost:5050/dropproject';

const jobWorker = {
    fetchHTML: (job) => {
        request(job, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
                MongoClient.connect(mongourl)
                .then(conn => {
                    return conn.collection('urlJobs')
                    .updateOne({ url : job }, { status: 'complete', html: body })
                    .then(() => conn.close())
                })
        });
    }
}

export default jobWorker;