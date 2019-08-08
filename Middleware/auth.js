const JWT = require('jsonwebtoken');
const USER = require('../models/user-model');

module.exports = (req, res, next) => {
    var token = req.headers.authorization;
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!err && decoded) {
            USER.findById(decoded.id)
                .then(foundUser => {
                    if (!foundUser && err) throw err
                    req.user = foundUser
                    return next()
                })
                .catch(err => {
                    next(err);
                })
        } else {
            req.errors = err
            return res.status(401).json({
                message: 'NOT AUTHORIZED',
                status: (401)
            })
        }
    })
}