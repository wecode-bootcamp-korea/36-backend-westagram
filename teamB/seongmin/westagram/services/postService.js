const postDao = require('../models/postDao');
const userDao = require('../models/userDao');

const createPost = async (title, content, user_id) => {
    const userCheckResult = await userDao.userCheck(user_id);
    
    if (Number(Object.values(userCheckResult[0])[0]) !== 1) {
        const err = new Error('USER_IS_NOT_EXISTED');
        err.statusCode = 400;
        throw err;
    }

    const insertPost = await postDao.insertPost(
        title,
        content,
        user_id
    );

    return insertPost;
};

const patchPost = async (postId, postingTitle, postingContent) => {
    const postCheckResult = await postDao.postCheck(postId);
    
    if (Number(Object.values(postCheckResult[0])[0]) !== 1) {
        const err = new Error('POSTING_IS_NOT_EXISTED');
        err.statusCode = 400;
        throw err;
    }

    const userPostResult = await postDao.patchPost(
        postId,
        postingTitle,
        postingContent
        );
        
    return userPostResult;
}

const deletePost = async(postId) => {
    await postDao.deletePost(postId);
}

module.exports = {
    createPost,
    patchPost,
    deletePost
}