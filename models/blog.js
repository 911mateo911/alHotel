const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/comment')

const blogSchema = new Schema({
    title: String,
    subtitle: String,
    description: String,
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
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    seen: Number
})

blogSchema.pre('save', function (next) {
    if (this.photo.length > 10) {
        throw new ExpressError("Photo limit exceeded", 400)
    } else {
        next()
    }
})

blogSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Blog', blogSchema)