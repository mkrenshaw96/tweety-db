const JWT = require('jsonwebtoken');
const USER = require('../models/user-model');

module.exports = (req, res, next) => {
    JWT.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
        if (!err && decoded && decoded.id === process.env.ADMIN) {
            USER.findById(decoded.id)
                .then(foundUser => {
                    if (!foundUser && err) throw err;
                    req.user = foundUser
                    return next();
                })
                .catch(err => {
                    next(err)
                })
        } else {
            req.errors = err
            return res.status(401).json({
                message: 'ADMIN ONLY ACCESSIBLE ROUTE',
                status: 401
            })
        }
    })
};