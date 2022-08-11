const postDao = require('../models/postDao');

const createPost = async (title, content, id)=> {
    try{
    const createPost = await postDao.createPost(
    title,
    content,
    id
    )
        return createPost;
}catch(err){
    const error = new Error("BAD request")
    error.statusCode=400;
    throw error
    }
}

const getAllPost = async (id)=>{
    try{
    const getAllPost = await postDao.getAllPost(id);
    return getAllPost;
    }catch(err){
        const error = new Error("BAD request")
        error.statusCode=400;
        throw error
    }
}

const deletePost = async (postId)=>{
    try{
    const deletePost = await postDao.deletePost(
        postId
    )
    
    return deletePost
    }catch(err){
        const error = new Error("BAD request")
        error.statusCode=400;
        throw error
    }
}

const patchPost = async (title, content, postId)=>{
    try{
    const patchPost = await postDao.patchPost(
        title,
        content,
        postId
    )
    return patchPost
    }catch(err){
        const error = new Error("BAD request")
        error.statusCode=400;
        throw error
    }
}

const logIn = async (email, password)=>{
    const logInAu = await postDao.logIn(
        email,
        password
    )
    return logInAu
}

module.exports = {
    createPost, getAllPost, deletePost, patchPost, logIn
}
