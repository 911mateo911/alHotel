const Discussion = require('../models/discussion')
const Comment = require('../models/comment')
const User = require('../models/user')
const asyncWrap = require('../middlewares/asyncWrap')
const { querySchema } = require('../schemas')

module.exports.allThreads = asyncWrap(async (req, res) => {
    const foundThreads = await Discussion.find({}).sort({ date: -1 }).limit(8).populate('author')
    let myThreads = ''
    if (req.isAuthenticated()) {
        myThreads = await Discussion.find({ author: req.user._id }).sort({ date: -1 }).populate('author')
    }
    res.render('threads/discussion', {
        title: 'Discussions',
        foundThreads,
        myThreads
    })
})

module.exports.newDiscussionSave = asyncWrap(async (req, res) => {
    const date = new Date()
    const { body, topic } = req.body.discuss
    const newDiscuss = new Discussion({
        body: body,
        date: date,
        author: req.user._id,
        topic: topic
    })
    await newDiscuss.save()
    req.flash('success', 'Success')
    res.redirect(`/discussion/thread/${newDiscuss._id}`)
})

module.exports.max50 = (req, res, next) => {
    if (req.body.page > 50) {
        res.send()
    } else {
        next()
    }
}

module.exports.discussionShow = asyncWrap(async (req, res) => {
    const { discussionID } = req.params
    const thread = await Discussion.findById(discussionID).populate({
        path: 'comments', populate: { path: 'author' }, options: { sort: { dateCreated: 'desc' } }
    }).populate('author')
    res.render('threads/discussionShow', {
        title: `${thread.body.slice(0, 20)}...`,
        thread
    })
})

module.exports.deleteThread = asyncWrap(async (req, res) => {
    const { discussionID } = req.params
    const blog = await Discussion.findById(discussionID)
    await Discussion.findOneAndDelete({ _id: discussionID })
    req.flash('success', "It's Gone")
    res.redirect('/discussion')
})

module.exports.getThreadResults = asyncWrap(async (req, res) => {
    const foundThreads = await Discussion.find({ body: { $regex: req.body.q, $options: 'i' } }).limit(5).populate('author')
    res.render('threads/threadSearch', {
        foundThreads,
        title: 'Found threads',
        query: req.body.q
    })
})

module.exports.notBlank = (req, res, next) => {
    const query = querySchema.validate(req.body)
    if (query.error) {
        res.render('threads/threadSearch', {
            foundThreads: "",
            title: 'Found threads',
            query: req.body.q
        })
    } else {
        next()
    }
}

module.exports.notScrollBlank = (req, res, next) => {
    const query = querySchema.validate(req.body)
    if (query.error) {
        res.send()
    } else {
        next()
    }
}

module.exports.scrollResults = asyncWrap(async (req, res) => {
    const foundThreads = await Discussion.find({ body: { $regex: req.body.q, $options: 'i' } }).limit(5).skip(req.body.page * 5).populate('author')
    res.send(foundThreads)
})