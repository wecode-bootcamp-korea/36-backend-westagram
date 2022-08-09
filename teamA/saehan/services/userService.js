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

    const createUser = await userDao.createUser(
        name,
        email,
        password
    );

    return createUser;
};

const posts = async(userId) => {
    const showPosts = await userDao.showPosts(
        userId
    );

    return showPosts;
};

module.exports = {
    signUp,
    posts
}