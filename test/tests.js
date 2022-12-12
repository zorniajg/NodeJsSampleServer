const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const Endpoint = require('../server/models/endpoint');
const EndpointController = require('../server/controllers/endpoint');

describe('Endpoint Controller', function() {
  before(function(done) {
    mongoose
      .connect(
        'mongodb+srv://zorniajg:sampleServer321@cluster0.sr9zynf.mongodb.net/test_server?retryWrites=true&w=majority'
      )
      .then(result => {
        const endpoint = new Endpoint({
          name: 'test',
          description: 'this is a test',
          _id: '5c0f66b979af55031b34728a'
        });
        return endpoint.save();
      })
      .then(() => {
        done();
      })
      .catch(done);
  });

  it('Should return the correct endpoint', function(done) {
    const req = { params:{ _id: '5c0f66b979af55031b34728a' } };
    const res = {
      endpoint: null,
      render: function(view, params) {
        this.endpoint = params.endpoint;
      }
    };
    EndpointController.getEndpoint(req, res, () => {}).then(() => {
      expect(res.endpoint.id).to.be.equal('5c0f66b979af55031b34728a');
      done();
    })
    .catch(done);
  });

  after(function(done) {
    Endpoint.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      })
      .catch(done);
  });
});
