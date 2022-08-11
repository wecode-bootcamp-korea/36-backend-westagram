const postDao = require('../models/postDao')

const enrollPost = async (title, content, userId) => {
    return await postDao.enrollPost(
        title,
        content,
        userId
    );
};

const allPost = async () => {
    return await postDao.allPost();
};

const userPost = async (userId) => {
    return await postDao.userPost(userId); 
};

const fixPost = async (title, content, postId, userId) => {
    return await postDao.fixPost(
        title,
        content,
        postId,
        userId
    );
};

module.exports ={
    enrollPost,
    allPost,
    userPost,
    fixPost
}