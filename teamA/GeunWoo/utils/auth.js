const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const validateToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers.authorization;

    const err = new Error('INVALID_TOKEN');
    
    if (!token) {
        err.statusCode(404);
        throw err;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.username;

        const userData = await userDao.getUserByEmail(decoded['email']);
        if (!userData[0]['email']) {
            throw err;
        }
    } catch (err) {
        return res.sendStatus(403);
    }

    next();
}

module.exports = {
    validateToken
}