const jwt = require('jsonwebtoken')

const myCustomMiddleware = async(req, res, next) => {
	try {
		const token = await req.headers.authorization;

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        if(decoded){
            next(); 
        }
	} catch (err) {
		next();
	}
}

module.exports = {
    myCustomMiddleware
}