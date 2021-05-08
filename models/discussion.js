const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/comment')

const discussionSchema = new Schema({
    body: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: Comment
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: String,
    date: Date
})

discussionSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Discussion', discussionSchema)