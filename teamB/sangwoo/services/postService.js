const postDao = require('../models/postDao');

const postRegist = async ( title, content, user_id ) => {
    const createPost = await postDao.createPost(
        title,
        content,
        user_id
    );
    return createPost;
};

const allPost = async () => {
    const viewPost = await postDao.viewPost();
    return viewPost;
}

const userPost = async( userId ) => {
    const postUser = await postDao.postUser( 
        userId
    );
    return postUser;
}

const updatePost = async ( userId, postId, title, content ) => {
    
    const patchPost = await postDao.patchPost(
        userId,
        postId,
        title,
        content
    );

    return patchPost;
};

const deletePost = async ( postId ) => {
    const postDelete = await postDao.postDelete(
        postId
    );
    return postDelete;
};

const likePost = async ( postId, userId ) => {
    const postLike = await postDao.postLike(
        postId, userId
    );
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
