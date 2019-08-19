const router = require('express').Router();
const POST = require('../models/post-model');
const USER = require('../models/user-model');
const AUTH = require('../Middleware/auth');
const ADMIN = require('../Middleware/admin');

router.post('/create', AUTH, async (req, res) => {
    const post = new POST({
        text: req.body.text,
        repost_amount: 0,
        like_amount: 0
    })
    //SAVE THE NEWLY CREATED POST
    await post.save()
        .then(async created => {
            //FIND THE USER WHO CREATED THE POST
            const user = await USER.findById(req.user.id)
            //PUSH THE POST ID INTO THE USER MODELS CREATEDPOST ARRAY FOR REFERENCE LATER
            await user.createdPost.push(post)
            //SAVE THE USER MODEL AFTER THE POST HAS BEEN CREATED TO UPDATE IN ATLAS
            await user.save()
                .then(() => res.status(200).json(created))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

//GET ALL POSTS FOR A CREATED USER
router.get('/my-post', AUTH, async (req, res) => {
    await USER.findById(req.user.id).populate('createdPost')
        .then(found => {
            var posts = found.createdPost
            res.status(200).json(posts)
        })
        .catch(err => res.status(500).json(err))
})

/////////////////////AWS S3 - MULTER///////////////////////

// const Models = require('../models/models'),
//     router = require('express').Router(),
//     multer = require('multer'),
//     Auth = require('../middleware/auth'),
//     multerS3 = require('multer-s3'),
//     AWS = require('aws-sdk'),
//     User = require('../models/user');
// const ACCESS = new AWS.S3({
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     region: process.env.REGION
// });
// const upload = multer({
//     storage: multerS3({
//         s3: ACCESS,
//         bucket: process.env.BUCKET,
//         acl: 'public-read',
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: (req, file, cb) => {
//             cb(null, `-POST-MEDIA-${req.user.username}` + '-' + Date.now() + '-' + file.originalname)
//         }
//     })
// })

// router.post('/post', Auth, upload.single('image'), (req, res) => {
//     Models.User.findOne({
//         where: {
//             id: req.user.id
//         }
//     })
//         .then(foundUser => {
//             console.log(foundUser)
//             foundUser.createPost({
//                 postUrl: req.file.location,
//                 likes: 0,
//                 caption: req.body.caption,
//                 postedFromLocation: req.body.postedFromLocation
//             })
//                 .then(createdPost => {
//                     res.status(200).json({ 'POST SUCCESSFULLY CREATED': createdPost })
//                 })
//                 .catch(err => res.status(500).json(err))
//         })
//         .catch(err => res.status(500).json(err))
// });

/////////////////////AWS S3 - MULTER///////////////////////

module.exports = router;