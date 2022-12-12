# NodeJsSampleServer

/cli contains cli-initmongodb.js which can be run using "node cli-initmongodb" to initialize the MongoDB (mongoose) database.

/cli contains cli-iotendpoint.js which can be run using "node cli-iotendpoint -n <endpointName> <endPointDescription>" to create a new endpoint and generate 100 random data points for it.

/server contains all the controllers, models, views, routes, and app.js which can be run using "node app.js" to start the server.

/test contains tests.js which can be run from the root directory using "npm test"