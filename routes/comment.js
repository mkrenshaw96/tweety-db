const router = require('express').Router();
const COMMENT = require('../models/comment-model');
const POST = require('../models/post-model');

//CREATE A COMMENT FOR A SPECIFIED POST BY URL PARAM
router.post('/create/:id', async (req, res) => {
    const comment = new COMMENT({
        text: req.body.text
    })
    await comment.save()
        .then(async created => {
            const post = await POST.findById(req.params.id)
            await post.comments.push(comment)
            await post.save()
                .then(() => res.status(200).json(created))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;