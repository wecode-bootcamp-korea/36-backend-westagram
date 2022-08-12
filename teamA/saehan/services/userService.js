const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const signUp = async(name, email, password) => {
    const nameValidation = new RegExp(
        '^[A-Za-z]{1}[A-Za-z0-9]{3,19}'
    );
    if(!nameValidation.test(name)){
        const err = new Error('NAME_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    };

    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if(!pwValidation.test(password)){
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    };

    const [emailDuplicate] = await userDao.emailDuplicate(
        email
    );
    
    if(Object.values(emailDuplicate)[0] == '1'){
        const err = new Error('DUPLICATED_EMAIL');
        err.statusCode = 409;
        throw err;
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const createUser = await userDao.createUser(
        name,
        email,
        hashedPassword
    );

    return createUser;
};

const signIn = async(email, password) => {
    const logInUser = await userDao.getUserByEmail(email);
    if(!logInUser){
        const err = new Error('USER_DOES_NOT_EXIST');
        err.statusCode = 404;
        throw err;
    };

    const result = await bcrypt.compare(password, logInUser.password);
    if(!result){
        const err = new Error("INVALID_PASSWORD");
        err.statusCode = 400;
        throw err;
    };

    const token = jwt.sign({ sub:logInUser.id, email: logInUser.email ,iat: Math.floor(Date.now() / 1000) - 30}, process.env.TOKEN_SECRET);
    return token;
};

const posts = async(userId) => {
    if(typeof parseInt(userId) != 'number'){
        const err = new Error('INVALID_INPUT_TYPE');
        err.statusCode = 409;
        throw err;
    };

    const showPosts = await userDao.showPosts(
        userId
    );

    return showPosts;
};

module.exports = {
    signUp,
    posts,
    signIn
}