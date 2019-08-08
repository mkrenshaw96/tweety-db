const USER = require('../models/user-model');
module.exports = async function getUser(req, res, next) {
    try {
        user = await USER.findById(req.params.id)
        if (user === null) {
            return res.status(404).json({ message: 'CANNOT FIND USER' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user;
    next();
}
