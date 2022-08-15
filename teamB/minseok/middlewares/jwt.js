const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET
const userDao = require("../models/userDao")


/*
const validateToken = async (req, res, next) => {
    try {
      const access_token = req.headers('access_token');
      const decoded = jwt.verify(access_token, secretKey);
      const userId = decoded.id;
      const foundUser = await getUserById(userId);
  
      if (!foundUser)
        errorGenerator({ statusCode: 404, message: 'USER_NOT_FOUND' });
      req.userId = userId;
      next();
    } catch (err) {
      next(err);
    }
  };
const jwt = require("jsonwebtoken");
*/


const validateToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
    
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const userName = decoded["sub"]
    const foundUser = await userDao.getUser(userName)
    if (!foundUser)
        errorGenerator({ statusCode: 401, message: "Invalid Token"})
  } catch (err) {
    next(err)
  }
  return next();
};



module.exports={validateToken}