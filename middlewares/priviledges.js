const Hotel = require('../models/hotels')
const Review = require('../models/review')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const Thread = require('../models/discussion')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    next()
}

module.exports.isAuthor = async (req, res, next) => {
    const { ID } = req.params
    const hotel = await Hotel.findById(ID)
    if (!hotel.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect(`/places/${ID}`)
    }
    next()
}

module.exports.isThreadAuthor = async (req, res, next) => {
    const { discussionID } = req.params
    const foundThread = await Thread.findById(discussionID)
    if (!foundThread.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect(`/discussion/thread/${ID}`)
    }
    next()
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { ID, commentID } = req.params
    const comment = await Comment.findById(commentID)
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect(`/blog/${ID}`)
    }
    next()
}

module.exports.isBlogAuthor = async (req, res, next) => {
    const { ID } = req.params
    const blog = await Blog.findById(ID)
    if (!blog.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect(`/blog/${ID}`)
    }
    next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { ID, reviewID } = req.params
    const review = await Review.findById(reviewID)
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that')
        return res.redirect(`/places/${ID}`)
    }
    next()
}