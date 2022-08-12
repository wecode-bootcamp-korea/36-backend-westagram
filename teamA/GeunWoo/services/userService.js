const userDao = require('../models/userDao');
const pwValidation = require('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUsers = async (name, gender, birth, contact, mbti, email, password) => {
    pwValidation.validatePw(password);
    
    if (typeof(name) != 'string' || 
        typeof(gender) != 'string' || 
        typeof(Number(birth)) != 'number' || 
        typeof(contact) != 'string' || 
        typeof(mbti) != 'string' || 
        typeof(email) != 'string' ||
        typeof(password) != 'string' 
        ) {
        const err = new Error('INVALID INPUTs');
        err.statusCode = 409;
        throw err;
    }

    const saltRounds = 15; 

    const makeHash = async (password, saltRounds) => {
      return await bcrypt.hash(password, saltRounds); 
    }

    const hashedPassword = await makeHash(password, saltRounds); 

    const createUsers = await userDao.createUsers(
        name,
        gender,
        birth,
        contact,
        mbti,
        email,
        hashedPassword
    );
        
    return createUsers;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user[0]) {
    const err = new Error('INVALID USER');
    err.statusCode = 404;
    throw err;
  }

  const result = await bcrypt.compare(password, user[0].password);

  if (!result) {
    const err = new Error('INVALID PASSWORD');
    err.statusCode = 400;
    throw err;
  }

  return jwt.sign({sub: user[0].id, 
                    email: user[0].email}, process.env.JWT_SECRET);
  };
  
module.exports = {
    createUsers, 
    signIn
}