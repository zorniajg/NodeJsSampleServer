const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var schema = new Schema({
    endpointId: {
        type: Schema.Types.ObjectID, ref: 'Endpoint',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Data', schema);