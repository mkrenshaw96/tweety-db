const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    post_img_url: {
        type: String,
        required: false
    },
    post_vid_url: {
        type: String,
        required: false
    },
    repost_amount: {
        type: String,
        required: true
    },
    like_amount: {
        type: String,
        required: true
    },
    //ADDING A CREATOR FOR TRACKING WHO MAKES THE POSTS
    creator: {
        type: Schema.Types.ObjectId,
        //POINTS AT THE USERS MODEL
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Post', postSchema)