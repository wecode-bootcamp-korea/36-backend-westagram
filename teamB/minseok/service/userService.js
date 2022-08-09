const userDao = require('../models/userDao')

const signUp = async (name, birth, contact, password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
        );
        if(!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;}
    
    const createUser = await userDao.createUser(
        name,
        birth,
        contact,
        password);
        return createUser};

const searchUserList = async (userId) => {
    const createUserList = await userDao.createUserList(userId);
        return createUserList
        };
    
module.exports = {signUp, searchUserList}

 