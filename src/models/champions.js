const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Champions', schema);