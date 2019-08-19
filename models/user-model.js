const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    //SETTING UP THE RELATIONSHIP TO THE POST MODEL FOR FETCHING
    createdPost: [
        {
            //STORES AN ARRAY OF ID'S
            type: Schema.Types.ObjectId,
            //POINTS AT THE POST MODEL FOR REFERENCE IN MONGO
            ref: 'Post'
        }
    ],
    createdComments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)