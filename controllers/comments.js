const asyncWrap = require('../middlewares/asyncWrap')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const Thread = require('../models/discussion')

module.exports.newComment = asyncWrap(async (req, res) => {
    const { ID } = req.params
    const blog = await Blog.findById(ID).populate({ path: 'comments' })
    const date = new Date()
    const blogComment = new Comment({
        body: req.body.comment.body,
        dateCreated: date,
        author: req.user._id
    })
    blog.comments.push(blogComment)
    await blog.save()
    await blogComment.save()
    req.flash('success', "Done")
    res.redirect(`/blog/${ID}`)
})

module.exports.newThreadComment = asyncWrap(async (req, res) => {
    const { discussionID } = req.params
    const thread = await Thread.findById(discussionID).populate({ path: 'comments' })
    const date = new Date()
    const threadComment = new Comment({
        body: req.body.comment.body,
        dateCreated: date,
        author: req.user._id
    })
    thread.comments.push(threadComment)
    await thread.save()
    await threadComment.save()
    req.flash('success', "Done")
    res.redirect(`/discussion/thread/${discussionID}`)
})

module.exports.deleteComment = asyncWrap(async (req, res) => {
    const { ID, commentID } = req.params
    await Blog.findByIdAndUpdate(ID, { $pull: { comments: commentID } })
    await Comment.findByIdAndDelete(commentID)
    req.flash('success', 'Gone')
    res.redirect(`/blog/${ID}`)
})

module.exports.deleteThreadComment = asyncWrap(async (req, res) => {
    const { discussionID, commentID } = req.params
    await Thread.findByIdAndUpdate(discussionID, { $pull: { comments: commentID } })
    await Comment.findByIdAndDelete(commentID)
    req.flash('success', 'Gone')
    res.redirect(`/discussion/thread/${discussionID}`)
})