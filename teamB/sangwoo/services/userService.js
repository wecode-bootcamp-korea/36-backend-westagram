const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userDao = require('../models/userDao');
const { validateEmailPw } = require('../utils/userValidators');

const signUp = async (name, email, password, profile_image) => {
    validateEmailPw( email, password );

    const user = await userDao.userEmail(email);
    if (user) {
        const err = new Error("EMAIL_ALREADY EXISTS");
        err.statusCode = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createUser = await userDao.createUser(name, email, hashedPassword, profile_image);

    return createUser;
};


const signIn = async (email, password) => {
    const user = await userDao.userEmail(email);
    if (!user) {
        const err = new Error("EMAIL_OR_PASSWORD_IS_DIFFERENT");
        err.statusCode = 400;
        throw err;
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
        const err = new Error("EMAIL_OR_PASSWORD_IS_DIFFERENT");
        err.statusCode = 400;
        throw err;
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET);
    
    return accessToken
};


    module.exports = {
        signUp,
        signIn
    }
