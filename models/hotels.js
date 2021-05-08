const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')
const findSum = (accumulator, currentValue) => accumulator + currentValue;
const ExpressError = require('../middlewares/expressError')

const hotelSchema = new Schema({
    name: String,
    price: String,
    description: String,
    location: String,
    photo: [
        {
            url: String,
            filename: String
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contact: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    avgReviews: Number,
    seen: Number
});

hotelSchema.pre('save', function (next) {
    if (this.photo.length > 10) {
        throw new ExpressError("Photo limit exceeded", 400)
    } else {
        next()
    }
})

hotelSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Hotel', hotelSchema)