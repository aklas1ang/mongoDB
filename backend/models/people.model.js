const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    fullname: {
        type: String,
        require: true,
        trim: true
    },
    occupation: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    phonenumber: {
        type: String,
        require: true,
        trim: true
    }
},{timestamps:true});

const People = mongoose.model('people', peopleSchema);

module.exports = People;