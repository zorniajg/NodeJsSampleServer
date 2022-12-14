const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String, 
    required: true
  },
  description: { type: String }
});

module.exports = mongoose.model('Endpoint', schema);