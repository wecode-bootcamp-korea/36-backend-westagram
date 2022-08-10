const postsDao = require('../models/postsDao')

const createPost = async (title, content, user_id, userProfileImage, postingImageUrl) => {
    const posting = await postsDao.posting(title, content, user_id, userProfileImage, postingImageUrl);
        return posting
        };

const searchList = async () => {
    const getList = await postsDao.getList();
        return getList
};

const updatePost = async (title, content, postingId) => {
    const patchPost = await postsDao.patchPost(title, content, postingId);
        return patchPost
}

const deletePost = async (Delete) => {
    const deleteList = await postsDao.deleteList(Delete);
        return deleteList}

module.exports={createPost, searchList, updatePost, deletePost}