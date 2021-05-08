const Hotel = require('../models/hotels')
const Blog = require('../models/blog')
const asyncWrap = require('../middlewares/asyncWrap')

module.exports.index = asyncWrap(async (req, res) => {
    const mostRated = await Hotel.find({}).sort({ avgReviews: -1 }).limit(5)
    const topBlogs = await Blog.find({}).sort({ seen: -1 }).limit(5)
    res.render('other/homePage', { mostRated, topBlogs })
})