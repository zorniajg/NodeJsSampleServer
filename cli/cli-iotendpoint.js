const program = require('commander');
const mongoose = require('mongoose');
//const mongo = require('mongodb').MongoClient;
const Endpoint = require('../server/models/endpoint');
const Data = require('../server/models/data');

let url = "mongodb+srv://zorniajg:sampleServer321@cluster0.sr9zynf.mongodb.net/iot_server?retryWrites=true&w=majority";
let dbName = "iot_endpoints";

program
.option('-n, --newEndpoint <name> <description>', 'Create new endpoint')
.option('-l, --listEndpoints', 'List _id, name, and description of all endpoints')
.option('-del, --deleteEndpoint <id>', 'Delete endpoint by id');

program.parse();
const options = program.opts();

async function createEndpoint(name, description) {
    let newEndpoint = new Endpoint({
        name: name,
        description: description
    });
    console.log('newEndpoint: ' + newEndpoint);

    try {
        await newEndpoint.save();
        postData(newEndpoint);
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function postData(endpoint) {
    let date = new Date('2022-01-01');
    let data = new Array();
    for(let i = 0; i < 100; i++) {
        data[i] = new Data({
            endpointId: endpoint._id,
            date: date,
            value: (Math.random() * 100).toFixed(2)
        });

        // Increment date by 15 minutes
        date = new Date(date.getTime() + (15 * 60000));
    }

    try {
        await Data.insertMany(data);
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function listEndpoints() {
    try {
        let endpoints = await Endpoint.find();
        console.log('Endpoints: \n' + endpoints);
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function deleteEndpoint(id) {
    try {
        await Endpoint.findByIdAndRemove(id);
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function run() {

    try {
        console.log("Connecting to " + url);
        await mongoose.connect( url );
        //if (!mongoose) throw "Could not connect to "+url;

        if (options.newEndpoint) {
            let endpointName = options.newEndpoint;
            let endpointDesc = program.args[0];
        
            createEndpoint(endpointName, endpointDesc);
        }
        
        if (options.listEndpoints)
            listEndpoints();
        
        if (options.deleteEndpoint) {
            let endpointId = options.deleteEndpoint;
            
            deleteEndpoint(endpointId);
        }
        //mongoose.connection.close();
        return true;

    } catch (err) {
        console.error(err);
        return false;
    }
}

run();