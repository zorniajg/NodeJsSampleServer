
const program = require('commander');
const mongoose = require('mongoose');
const Endpoint = require('../server/models/endpoint');
const Data = require('../server/models/data');
//const mongo = require('mongodb').MongoClient;

let url = "mongodb+srv://zorniajg:sampleServer321@cluster0.sr9zynf.mongodb.net/iot_server?retryWrites=true&w=majority";

program
    .option('-u, --url <n>', 'Specify mongodb url')
    .option('-v, --verbose', 'show all');

program.parse();
const options = program.opts();

if (options.url) {
    url = program.url;
}
else {
    /*
    console.log("-u option missing. Must specify the mongodb url");
    program.help();
    process.exit(1);
     */
}

if (options.dbName) {
    dbName = options.dbName;
}
else {
    /*
    console.log("-d option missing. Must specify the database name");
    program.help();
    process.exit(1);
     */
}

if (options.verbose) {
    //console.log(JSON.stringify(program, null, 2));
    console.log("url = " + url);
    console.log("dbName = " + dbName);
}

async function dropCollection(mdb,name) {
    try {
        let oldCollection = mdb.collection(name);
        if (oldCollection) {
            await oldCollection.drop();
            if (program.verbose) console.log("Dropping old collection " + name);
        }
    } catch (err) {

    }
}

async function createCollection(mdb,name) {
    if (program.verbose) console.log("Creating collection " + name);
    let collection = await mdb.createCollection(name);
    if (!collection) throw "Could not create "+name+" collection";

    return collection;
}

async function initialize() {

    try {
        if (program.verbose) console.log("Connecting to " + url);
        await mongoose.connect( url );

        await Endpoint.collection.drop();
        await Data.collection.drop();

        await Endpoint.createCollection();
        await Data.createCollection();

    } catch (err) {
        console.error(err);
        return false;
    }

    mongoose.connection.close();
    return true;
}

// async function initialize_wait() {
//     let bOk = await initialize();
// }

initialize();