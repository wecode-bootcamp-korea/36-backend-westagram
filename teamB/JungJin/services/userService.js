const userDao = require('../models/userDao')

const bcrypt = require('bcrypt');
const saltRounds = 12;

const payLoad = { foo: 'bar' };
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRETKEY; 

const signup = async (name, email, profile_image, beforepassword) => {
    if(!email.includes('@')) {
        const err = new Error('EMAIL_INVALID')
        err.statusCode = 400
        throw err
    }
    if(beforepassword.length < 4) {
        const err = new Error('PASSWORD_INVALID')
        err.statusCode = 400
        throw err
    }
    const password = await bcrypt.hash(beforepassword, saltRounds)
    const createUser = await userDao.createUser(name, email, profile_image, password)
    return createUser;
};

const lookup = async (query) => {
    const lookupUser = await userDao.lookupUser(query)
    return lookupUser
};

const login = async (email, checkpassword) => {
    const loginUser = await userDao.loginUser(email)
    const result = await bcrypt.compare(checkpassword, loginUser[0].password)
    if(result) {
        const token = jwt.sign(payLoad, secretKey)
        return token;
    }
    else {
        const err = new Error('Invalid User')
        err.statusCode = 400
        throw err
    }
};
  
module.exports = {
    signup, lookup, login
}