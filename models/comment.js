const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    body: String,
    dateCreated: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Comment', commentSchema)