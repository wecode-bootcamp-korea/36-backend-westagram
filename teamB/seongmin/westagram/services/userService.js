const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao')
const saltRounds = 12;

require('dotenv').config();

const secretKey = process.env.PRIVATEKEY;

const signUp = async (name, email, profileImage, password) => {
    const pwValidation = new RegExp(
        `^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@$^%&*])(?=.{8,20})`
    );
    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const bcryptPassword = await bcrypt.hash(password, saltRounds);

    const createUser = await userDao.createUser(
        name,
        email,
        bcryptPassword,
        profileImage
    );

    return createUser;
};

const search = async () => {
    const searchUser = await userDao.search();
    return searchUser;
}

const login = async (email, password) => {
    const bcryptPassword = await userDao.passwordCheck(email);
    const bcryptCheck = await bcrypt.compare(password, bcryptPassword[0]['password']);

    if (bcryptCheck !== true) {
        const err = new Error('INVALID_USER');
        err.statusCode = 401;
        throw err;
    }
    const payLoad = { email };

    const token = jwt.sign(payLoad, secretKey);
    return token;
}

module.exports = {
    signUp,
    search,
    login
}