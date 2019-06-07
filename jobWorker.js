import request from 'request';
import database from './db/db';

const db = new database();

const jobWorker = {
    foobar: () => {
        console.log('WORKS', fb.thing);
    }, 
    fetchHTML: (job) => {
        request(job.url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            db.col.find({ _id: job._id }, (error, result) => {
                console.log('result',result);
            });
        });
    }
}

export default jobWorker;