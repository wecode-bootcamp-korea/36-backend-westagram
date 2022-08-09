const postDao = require('../models/postDao');
const userDao = require('../models/userDao');

const searchPosts = async () => {
    return await postDao.searchPosts();
}

const searchUserPost = async (userId) => {
    const userCheckResult = await userDao.userCheck(userId);
    
    if (Number(Object.values(userCheckResult[0])[0]) !== 1) {
        const err = new Error('USER_IS_NOT_EXISTED');
        err.statusCode = 400;
        throw err;
    }

    const userPostResult = await postDao.searchUserPost(userId);
    return userPostResult[0];
}

module.exports = {
    searchPosts,
    searchUserPost
}