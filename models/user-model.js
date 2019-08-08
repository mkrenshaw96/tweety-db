const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    profile_pic_url: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    date_of_birth: {
        type: String,
        required: false
    },
    join_date: {
        type: String,
        required: false,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)