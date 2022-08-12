const jwt = require('jsonwebtoken');

const validateToken = async(req, res, next) => {
    try{
        const token = req.headers.authorization;
        const check = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch(err) {
        next(err);
    };
};

module.exports ={
    validateToken
}