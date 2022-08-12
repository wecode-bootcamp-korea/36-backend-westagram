const userDao = require('../models/userDao')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const signUp = async (name, birth, contact, password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
        );
        if(!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;}

        const user = await userDao.getUser(name, contact);
        
        if (user.contact === contact) {
            const err = new Error("YOU_ARE_ALREADY_EXISTED");
            err.statusCode = 409;
            throw err;
          }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await userDao.createUser(name, birth, contact, hashedPassword);
};

const searchUserList = async (userId) => {
    const createUserList = await userDao.createUserList(userId);
        return createUserList
        };

const signIn = async (name, password) => {
    
    const checkoutName = await userDao.getUser(name);
        if(!checkoutName) {const err = new Error("INVAILD NAME");
        err.statusCode = 409;
        throw err;}
        console.log(password)
        const checkoutPassword = await bcrypt.compare(password, checkoutName.password);
        if(!checkoutPassword) {const err = new Error("INVAILD PASSWORD");
        err.statusCode = 409;
        throw err;} 
    
        return jwt.sign({
            "iss": "minseok",
            "exp": 1485270000000,
            "https://dnjscksdn98.com/jwt_claims/is_admin": true,
            "userId": "minseok",
            }, process.env.JWT_SECRET)
                }; 
    
module.exports = {signUp, searchUserList, signIn}

 