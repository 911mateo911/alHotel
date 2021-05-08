const { querySchema } = require('../schemas')
const asyncWrap = require('../middlewares/asyncWrap')
const Hotel = require('../models/hotels')
const Blog = require('../models/blog')

module.exports.notBlank = (req, res, next) => {
    const queryString = querySchema.validate(req.body)
    if (queryString.error) {
        res.render('other/results', {
            title: 'Found places',
            foundPlaces: "",
            foundBlogs: "",
            query: ""
        })
    } else {
        next()
    }
}

module.exports.validateQuery = (req, res, next) => {
    const query = querySchema.validate(req.body)
    if (query.error) {
        res.send()
    } else {
        next()
    }
}

module.exports.max50 = (req, res, next) => {
    if (req.body.page > 50) {
        res.send()
    } else {
        next()
    }
}

module.exports.getResults = asyncWrap(async (req, res) => {
    const foundPlaces = await Hotel.find({ name: { $regex: req.body.q, $options: 'i' } }).limit(5)
    const foundBlogs = await Blog.find({ title: { $regex: req.body.q, $options: 'i' } }).limit(5)
    res.render('other/results', {
        title: 'Found places/blogs',
        foundPlaces,
        foundBlogs,
        query: req.body.q
    })
})

module.exports.getScrollResults = asyncWrap(async (req, res) => {
    if (req.body.content === 'Stays') {
        const foundStays = await Hotel.find({ name: { $regex: req.body.q, $options: 'i' } }).limit(5).skip(req.body.page * 5)
        res.send(JSON.stringify(foundStays))
    } else if (req.body.content === 'Blogs') {
        const foundBlogs = await Blog.find({ title: { $regex: req.body.q, $options: 'i' } }).limit(5).skip(req.body.page * 5)
        res.send(foundBlogs)
    }
})