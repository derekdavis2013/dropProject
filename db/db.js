// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { MongoClient } from 'mongodb';

import mongodb from 'mongo-mock';

let instance;

export default class Database {
    constructor(){
        if (instance) {
            return instance;
        }

        this.MongoClient = mongodb.MongoClient;
        this.MongoClient.persist="mongo.js";

        this.mongourl = 'mongodb://localhost:5050/dropproject';

        instance = this;
    }

    insertOne(document) {

    }

    async init() {
        const mongod = await new MongoMemoryServer();
        const uri = await mongod.getConnectionString();

        const port = await mongod.getPort();
        const dbPath = await mongod.getDbPath();
        const dbName = await mongod.getDbName();
        const con = await MongoClient.connect(uri, { useNewUrlParser: true });
        this.db = con.db(dbName);
        this.col = this.db.collection('urlJobs');
    }
}