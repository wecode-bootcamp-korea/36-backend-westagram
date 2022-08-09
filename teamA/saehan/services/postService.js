const postDao = require("../models/postDao");

const allPosts = async () => {
    const postsList = await postDao.postsList();
    
    return postsList;
};

const posting = async(title, content, user_id) => {
    const postUp = await postDao.posting(
        title,
        content,
        user_id
    );

    return postUp;
};

const update = async(userId,postId,title,content) => {
    const updatePost = await postDao.updatePost(
        userId,
        postId,
        title,
        content
    );

    return updatePost;
};

const deletePost = async(postId) => {
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
