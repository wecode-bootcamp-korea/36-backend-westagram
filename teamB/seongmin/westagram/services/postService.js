const postDao = require('../models/postDao');

const createPost = async (title, content, user_id) => {
    const insertPost = await postDao.insertPost(
        title,
        content,
        user_id
    );

    return insertPost;
};

const patchPost = async (postId, postingTitle, postingContent) => {
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