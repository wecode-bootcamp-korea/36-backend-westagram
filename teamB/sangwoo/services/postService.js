const postDao = require('../models/postDao');

const postRegist = async ( title, content, userId ) => {
    const createPost = await postDao.createPost(
        title,
        content,
        userId
    );
    return createPost;
};

const allPost = async () => {
    const viewPost = await postDao.viewPost();
    return viewPost;
}

const userPost = async( userId ) => {
    const findUserPost = await postDao.findPostUser(userId)
    const getUserPost = await postDao.getPostPublishers(userId)
    
    if(!findUserPost || !getUserPost){
        const err = new Error ('NO_USER_OR_POSTS')
        err.statusCode = 404;
        throw err;
    }
    const postUser = await postDao.postUser( userId );

    return postUser;
}

const updatePost = async ( userId, postId, title, content ) => {
    const findUserPost = await postDao.findPostUser(userId)
    const getUserPost = await postDao.findPost(postId)
    
    if(!findUserPost || !getUserPost){
        const err = new Error ('NO_USER_OR_POSTS')
        err.statusCode = 404;
        throw err;
    }

    const patchPost = await postDao.patchPost(
        userId,
        postId,
        title,
        content
    );

    return patchPost;
};

const deletePost = async ( postId ) => {
    const getUserPost = await postDao.findPost(postId)
    
    if(!getUserPost){
        const err = new Error ('NOT_POSTS')
        err.statusCode = 404;
        throw err;
    }
    const postDelete = await postDao.postDelete( postId );
    return postDelete;
};

const likePost = async ( postId, userId ) => {
    const findUserPost = await postDao.findPostUser(userId)
    const getUserPost = await postDao.findPost(postId)
    
    if(!findUserPost || !getUserPost){
        const err = new Error ('NO_USER_OR_POSTS')
        err.statusCode = 404;
        throw err;
    }
    const postLike = await postDao.postLike( postId, userId );
    return postLike;
};

    module.exports = {
        postRegist,
        allPost,
        userPost,
        updatePost,
        deletePost,
        likePost
    }
