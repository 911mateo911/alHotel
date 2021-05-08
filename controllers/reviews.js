const Hotel = require('../models/hotels')
const Review = require('../models/review')
const asyncWrap = require('../middlewares/asyncWrap')
const findSum = (accumulator, currentValue) => accumulator + currentValue;

function getAvg(array) {
    if (array.length) {
        return Math.round((array.map(r => r.rating).reduce(findSum) / array.length) * 10) / 10
    } else {
        return 0
    }
}

module.exports.postReview = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const { rating, body } = req.body.review
    const hotel = await Hotel.findById(ID).populate({ path: 'reviews' })
    const date = new Date()
    const review = new Review({
        rating,
        body,
        dateCreated: date
    })
    review.author = req.user._id
    hotel.reviews.push(review)
    hotel.avgReviews = getAvg(hotel.reviews)
    await review.save()
    await hotel.save()
    req.flash('success', 'Appreciate it')
    res.redirect(`/places/${ID}`)
})

module.exports.deleteReview = asyncWrap(async (req, res) => {
    const { ID, reviewID } = req.params
    await Hotel.findByIdAndUpdate(ID, { $pull: { reviews: reviewID } })
    await Review.findByIdAndDelete(reviewID)
    req.flash('success', 'Gone')
    res.redirect(`/places/${ID}`)
})