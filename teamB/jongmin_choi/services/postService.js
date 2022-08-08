const postDao = require('../models/postDao');

const posting = async (title, content, postImage, userId) => {

    // validation 보류 list
    // const postImageValidation = new RegExp();
    // const contentValidation = new RegExp();

    const titleValidation = new RegExp(/[\w]+/);

    const userIdValidation = new RegExp(/^\d+$/);

    if(!userIdValidation.test(userId)) {
        const err = new Error('USER_ID_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    } else if(!titleValidation.test(title)) {
        const err = new Error('TITLE_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const createPost = await postDao.createPost(
        title,
        content,
        postImage,
        userId
    );

    return createPost;
}

const likes = async (postId, userId) => {

    const userIdValidation = new RegExp(/^\d+$/);

    if(!userIdValidation.test(userId || postId)) {
        const err = new Error('ID_INFO_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const createLike = await postDao.createLike(postId, userId);

    return createLike;
}

const deleting = async (postId) => {

    const userIdValidation = new RegExp(/^\d+$/);

    if(!userIdValidation.test(postId)) {
        const err = new Error('USER_ID_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const deletePost = await postDao.deletingPost(postId);

    return deletePost;
}

const getPostList = async () => {
    const gettingPosts = await postDao.postList();

    return gettingPosts;
}

const updatePost = async (title, content, postImage, postId) => {
    // validation 보류 list
    // const postImageValidation = new RegExp();
    // const contentValidation = new RegExp();

    const titleValidation = new RegExp(/[\w]+/);

    const userIdValidation = new RegExp(/^\d+$/);

    if(!userIdValidation.test(postId)) {
        const err = new Error('POST_ID_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    } else if(!titleValidation.test(title)) {
        const err = new Error('TITLE_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }

    const updatedPostInfo = await postDao.getUpdateInfo(title, content, postImage, postId);

    return updatedPostInfo;
}

module.exports = {
    posting,
    likes,
    deleting,
    getPostList,
    updatePost
};