const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.post('save', function (err, doc, next) {
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error('A user with the given email is already registered'));
    }
    next(err);
})

UserSchema.plugin(passportLocalMongoose, { usernameLowerCase: true })

module.exports = mongoose.model('User', UserSchema)