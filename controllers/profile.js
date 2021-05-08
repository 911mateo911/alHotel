const Hotel = require('../models/hotels')
const Blogs = require('../models/blog')
const asyncWrap = require('../middlewares/asyncWrap')
const User = require('../models/user')

module.exports.getUser = asyncWrap(async (req, res) => {
    const { userID } = req.params
    const foundPlaces = await Hotel.find({ author: userID }).limit(5)
    const foundBlogs = await Blogs.find({ author: userID }).limit(5)
    const user = await User.find({ _id: userID })
    res.render('other/profile', {
        title: `alHotel: ${user[0].username}`,
        username: user[0].username,
        foundBlogs,
        foundPlaces
    })
})

module.exports.getOtherPosts = asyncWrap(async (req, res) => {
    const { userID } = req.params
    if (req.body.content === 'Stays') {
        const foundStays = await Hotel.find({ author: userID }).limit(5).skip(req.body.page * 5)
        res.send(foundStays)
    } else if (req.body.content === 'Blogs') {
        const foundBlogs = await Blogs.find({ author: userID }).limit(5).skip(req.body.page * 5)
        res.send(foundBlogs)
    }
})