const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Endpoint = require('./models/endpoint');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const endpointRoutes = require('./routes/endpoint');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5bab316ce0a7c75f783cb8a8')
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/', endpointRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://zorniajg:sampleServer321@cluster0.sr9zynf.mongodb.net/iot_server?retryWrites=true&w=majority"
  )
  .then(result => {
    Endpoint.findOne().then(endpoint => {
      if (!endpoint) {
        const endpoint = new Endpoint({
          name: 'Vacuum',
          description: "Vacuum device"
        });
        endpoint.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
