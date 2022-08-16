const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const userDao = require('../models/userDao')
const validators = require('../utils/validators') 

const signUp = async (name, email, profileImage, password) => {
  
  const [user] = await userDao.getUserByEmail(email);
  
  if(user) {
    const error = new Error("duplicated email");
    error.statusCode = 409;
    throw error;
  }
  
  validators.validateEmail(email);
  validators.validatePw(password);
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await userDao.createUser( 
        name,
        email,
        profileImage,
        hashedPassword
    );
};

const signIn = async (email, password) => {
    const user = await userDao.getUserByEmail(email);
  
    if (!user) {
      const error = new Error("specified user does not exist");
      error.statusCode = 404;
      throw error;
    }
  
    const result = await bcrypt.compare(password, user.password);
  
    if (!result) {
      const error= new Error("password is not valid");
      error.statusCode = 400;
      throw error;
    }
  
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET);
};

const postLike = async(userId, postId) => {

    const user = await userDao.getUserByUserId(userId);
  
    if (!user) {
      const error = new Error("specified user does not exist");
      error.statusCode = 404;
      throw error;
    }

    await userDao.createLike(userId, postId);
}

module.exports ={
    signUp,
    signIn,
    postLike
}