const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    repost_amount: {
        type: Number,
        required: false
    },
    like_amoubt: {
        type: Number,
        required: false
    },
    creator:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    belongsTo:
    {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
})

module.exports = mongoose.model('Comment', commentSchema);