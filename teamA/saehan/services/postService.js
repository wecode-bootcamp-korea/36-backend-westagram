const postDao = require("../models/postDao");
const userDao =require('../models/userDao');
const jwt = require('jsonwebtoken');

const allPosts = async () => {
    const postsList = await postDao.postsList();
    
    return postsList;
};

const posting = async(title, content, user_id, token) => {
    if(typeof title != 'string' || typeof content != 'string' || typeof parseInt(user_id) != 'number'){
        const err = new Error('INVALID_INPUT_TYPE');
        err.statusCode = 409;
        throw err;
    };

    const decode =jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = Object.values(decode)[0];
    
    if(user_id != userId){
        const err = new Error('INVALID_INPUT');
        err.statusCode = 400;
        throw err;
    };

    const postUp = await postDao.posting(
        title,
        content,
        user_id
        );     
    return postUp;
};

const update = async(userId,postId,title,content) => {
    if(typeof parseInt(userId) != 'number' || typeof parseInt(postId) != 'number' || typeof title != 'string' || typeof content != 'string'){
        const err = new Error('INVALID_INPUT_TYPE');
        err.statusCode = 409;
        throw err;
    };
    
    const updatePost = await postDao.updatePost(
        userId,
        postId,
        title,
        content
    );

    return updatePost;
};

const deletePost = async(postId) => {
    if(typeof(postId) != number){
        const err = new Error('INVALID_INPUT_TYPE');
        err.statusCode = 409;
        throw err;
    };
    
    const removePost = await postDao.removePost(
        postId
    );
    
    return removePost;
};

module.exports = {
    allPosts,
    posting,
    update,
    deletePost
}