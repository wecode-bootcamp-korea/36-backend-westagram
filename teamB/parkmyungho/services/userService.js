const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const userDao = require('../models/userDao')


const signUp = async (name, email, profileImage, password) => {
    const pwValidation = new RegExp(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/
    );
    if(!pwValidation.test(password)) {
        const error = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw error;
    }

    const emailValidation = new RegExp(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    );
    if (!emailValidation.test(email)){
        const error = new Error ('EMAIL_INVALID')
        error.statusCode = 400
        throw error;
    }

    const user = await userDao.getUserByEmail(email);

    if(user) {
        const error = new Error("duplicated email");
        error.statusCode = 409;
        throw error;
    }
 
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
      const error= new Error("invalid password");
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