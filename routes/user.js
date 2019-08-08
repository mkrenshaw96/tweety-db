const router = require('express').Router();
const USER = require('../models/user-model');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const AUTH = require('../Middleware/auth');
const ADMIN = require('../Middleware/admin');

//QUERY METHODS 
// .find()
// .findById()
// .findOne()
// .findByIdAndDelete
// .findByIdAndRemove
// .findByIdAndUpdate
// .findOneAndDelete
// .findOneAndRemove
// .findOneAndUpdate
// .where()

//CREATE METHODS
// .save()

//GET ALL USERS (ADMIN ONLY ACCESSABLE)
router.get('/all', ADMIN, async (req, res) => {
    // try {
    //     const users = await USER.find()
    //     res.status(200).json(users)
    // } catch (err) {
    //     res.status(500).json({ message: err.message })
    // }
    await USER.find()
        .then(found => res.status(200).json(found))
        .catch(err => res.status(500).json(err))
})

//TEST FOR AUTH MIDDLEWARE IN FINDONEBYID FUNCTION
router.get('/oneboi', AUTH, async (req, res) => {
    await USER.findById(req.user.id)
        .then(found => res.status(200).json(found))
        .catch(err => res.status(500).json(err))
})

//SIGN UP A NEW USER AND GIVE THEM A SESSION TOKEN FOR ACCESS LATER ON
router.post('/signup', async (req, res) => {
    const newUser = new USER({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
        profile_pic_url: 'blank...',
        location: 'blank...',
        date_of_birth: req.body.date_of_birth
    })
    // try {
    //     const newUser = await user.save()
    //     res.status(201).json(newUser)
    // } catch (err) {
    //     res.status(400).json({ message: err.message })
    // }
    await newUser.save()
        .then(createdUser => {
            var token = JWT.sign({
                id: createdUser.id
            }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                })
            res.status(200).json({
                message: 'USER SUCCESSFULLY CREATED',
                sessionToken: token,
                user: createdUser,
                status: 200
            })
        })
        .catch(err => res.status(400).json(err))
})

//LOGIN A USER A GIVE THEM A SESSION TOKEN FOR ACCESS LATER ON
router.post('/login', async (req, res) => {
    await USER.findOne({ username: req.body.username })
        .then(foundUser => {
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if (match) {
                    var token = JWT.sign({
                        id: foundUser.id
                    }, process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 24
                        })
                    res.status(200).json({
                        message: 'USER SUCCESSFULLY LOGGED IN',
                        sessionToken: token,
                        user: foundUser,
                        status: 200
                    })
                } else {
                    res.status(401).json({ status: 401, message: 'PASSWORDS DO NOT MATCH' })
                }
            })
        })
        .catch(err => res.status(500).json(err))
})

//DELETE ROUTE USING MIDDLEWARE TO GET THE USER BY URL PARAM USER ID 
router.delete('/delete', AUTH, async (req, res) => {
    await USER.findOne({ "_id": req.user.id })
        .then(async foundUser => {
            await USER.findByIdAndDelete(foundUser.id)
                .then(() => res.status(200).json('USER SUCCESSFULLY DELETED'))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

//UPDATE USER BY ID 
router.put('/update', AUTH, async (req, res) => {
    //MUST USE { NEW: TRUE } TO RETURN THE UPDATED DOCUMENT
    await USER.findOneAndUpdate({ "_id": req.user.id }, { name: req.body.name }, { new: true })
        .then(updated => res.status(200).json(updated))
        .catch(err => res.status(500).json(err))
})
module.exports = router;