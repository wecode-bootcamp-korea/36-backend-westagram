const postDao = require('../models/postDao')

const enrollPost = async (title, content, userId) => {
    const enrollPost = await postDao.enrollPost(
        title,
        content,
        userId
    );
    return enrollPost;
};

const allPost = async () => {
    const allPost = await postDao.allPost();
    return allPost;
};

const userPost = async (userId) => {
    const userPost = await postDao.userPost(userId);
    return userPost;
};

const fixPost = async (title, content, postId) => {
    const fixPost = await postDao.fixPost(
        title,
        content,
        postId
    );
    return fixPost;
};

module.exports ={
    enrollPost,
    allPost,
    userPost,
    fixPost
}