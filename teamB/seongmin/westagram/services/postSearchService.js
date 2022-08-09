const postDao = require('../models/postDao');

const searchPosts = async () => {
    return await postDao.searchPosts();
}

const searchUserPost = async (userId) => {
    const userPostResult = await postDao.searchUserPost(userId);
    return userPostResult[0];
}

module.exports = {
    searchPosts,
    searchUserPost
}