const userDao = require('../models/userDao');

const signup = async (name, email, profileImage, password) => {

    // profileImageValidation은 보류
    // const profileImageValidation = new RegExp();

    const nameValidation = new RegExp( /^[a-zA-Z0-9]{2,30}$/);

    const emailValidation = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    const pwValidation = new RegExp(/^[a-zA-Z0-9]{1,20}$/);

    if(!nameValidation.test(name)) {
        const err = new Error('NAME_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    } else if (!emailValidation.test(email)) {
        const err = new Error('EMAIL_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    } else if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }


    const createUser = await userDao.createUser(
        name,
        email,
        profileImage,
        password
    );

    return createUser;
};

const getPosts = async (userId) => {

    const userIdValidation = new RegExp(/^\d+$/);

    if(!userIdValidation.test(userId)) {
        const err = new Error('USER_ID_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const userPosts = await userDao.gettingUserPosts(userId);

    const posts = {
        userId : userId,
        posting : userPosts
    };

    return posts;
}



module.exports = {
    signup,
    getPosts
}