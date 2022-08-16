const postDao = require('../models/postDao')

const createPost = async (title, content, userId) => {
    return await postDao.createPost(
        title,
        content,
        userId
    );
};

const getPosts = async () => {
    return await postDao.getAllPosts();
};

const getUserPosts = async (userId) => {
    return await postDao.getPostsByUserId(userId); 
};

const updatePost = async (title, content, postId, userId) => {
    return await postDao.updatePostByUserId(
        title,
        content,
        postId,
        userId
    );
};

const deletePost = async(postId)=> {
    const [post] = await postDao.getPostByPostId(postId)
    
    if(!post){
        const error = new Error('specified post does not exist')
        error.statusCode = 404;
        throw error;
    }

    return await postDao.deletePostByPostId(postId);
 }

module.exports ={
    createPost,
    getPosts,
    getUserPosts,
    updatePost,
    deletePost
}