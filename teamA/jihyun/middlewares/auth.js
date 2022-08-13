//middlewares/auth.js

const userDao = require("../models/userDao");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const accessToken = headers.split(" ")[1];
    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
    const userId = decode.id;
    const user = await userDao.getUserByuserId(userId);

    if (!user) {
      res.status(404).json({ message: "USER_NOT_FOUND" });
    }else{
      req.userId = userId;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken,
};
