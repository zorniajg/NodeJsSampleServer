
const Endpoint = require('../models/endpoint');
const Data = require('../models/data');

exports.getEndpoints = (req, res, next) => {
  Endpoint.find()
    .then(endpoints => {
      console.log(endpoints);
      res.render('endpoints/index', {
        ends: endpoints,
        pageTitle: 'Endpoints',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};               

exports.getEndpoint = async (req, res, next) => {
  const endpointId = req.params._id;

  try{
    let foundEndpoint = await Endpoint.findById(endpointId);
    let endpointData = await Data.find({ 'data.endpointId': foundEndpoint._id });

    res.render('endpoints/endpoint-data', {
      endpoint: foundEndpoint,
      data: endpointData,
      pageTitle: foundEndpoint.name,
      path: '/endpoints'
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

// exports.getData = (req, res, next) => {
//   Data.find({ 'data.endpointId': req.params.endpointId })
//     .then(data => {
//       console.log(data);
//       res.render('/endpoint-data', {
//         path: '/data',
//         pageTitle: 'Endpoint Data',
//         data: data
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.deleteEndpoint = async (req, res, next) => {
  const endpointId = req.body.endpointId;

  try {
    await Endpoint.findByIdAndRemove(endpointId);
    await Data.deleteMany({ endpointId: endpointId });

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};
