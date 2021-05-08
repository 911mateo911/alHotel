const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String,
    nVisited: Number
});

module.exports = mongoose.model('Hotel', hotelSchema)