const ExpressError = require('./expressError')
const { hotelSchema, reviewSchema, profileScrollSchema, discussionSchema, userSchema, blogSchema, commentSchema, paramSchema } = require('../schemas')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage }).array('photo', 10)
const Hotel = require('../models/hotels')
const Blog = require('../models/blog')

module.exports.uploadPhotos = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).render('elements/error', {
                msg: 'Maximum of 10 photos allowed',
                title: 'Oooops'
            })
        } else {
            next()
        }
    })
}

module.exports.validateThread = (req, res, next) => {
    const thread = discussionSchema.validate(req.body)
    if (thread.error) {
        throw new ExpressError('I didnt get what are you trying to do :(', 400)
    } else {
        next()
    }
}

module.exports.safeParam = (req, res, next) => {
    const { userID } = req.params
    const param = paramSchema.validate(userID)
    if (param.error) {
        throw new ExpressError('I didnt get what are you trying to do :(', 400)
    } else {
        next()
    }
}

module.exports.validateProfileScroll = (req, res, next) => {
    const body = profileScrollSchema.validate(req.body)
    if (body.error) {
        res.send()
    } else {
        next()
    }
}

module.exports.editPhotos = async (req, res, next) => {
    const edit = multer({ storage }).array('photo', 10)
    edit(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).render('elements/error', {
                msg: 'Maximum of 10 photos allowed, please delete some photos before uploading newer',
                title: 'Oooops'
            })
        } else {
            next()
        }
    })
}

module.exports.editBlogPhotos = async (req, res, next) => {
    const edit = multer({ storage }).array('photo', 10)
    edit(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).render('elements/error', {
                msg: 'Maximum of 10 photos allowed, please delete some photos before uploading newer',
                title: 'Oooops'
            })
        } else {
            next()
        }
    })
}

module.exports.validateComment = (req, res, next) => {
    const comment = commentSchema.validate(req.body)
    if (comment.error) {
        throw new ExpressError('I didnt get what are you trying to do :(', 400)
    } else {
        next()
    }
}

module.exports.validateUser = (req, res, next) => {
    const user = userSchema.validate(req.body)
    if (user.error) {
        throw new ExpressError('I didnt get what are you trying to do :(', 400)
    } else {
        next()
    }
}

module.exports.validateHotel = (req, res, next) => {
    const hotel = hotelSchema.validate(req.body)
    if (hotel.error) {
        console.log(hotel.error.details)
        throw new ExpressError(hotel.error.details, 400)
    } else {
        next()
    }
}

module.exports.validateBlog = (req, res, next) => {
    const blog = blogSchema.validate(req.body)
    if (blog.error) {
        throw new ExpressError(blog.error.context, 400)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const review = reviewSchema.validate(req.body)
    if (review.error) {
        throw new ExpressError('I didnt get what are you trying to do :(', 400)
    } else {
        next()
    }
}