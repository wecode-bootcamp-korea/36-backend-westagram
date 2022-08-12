const postDao = require('../models/postDao')

const posting = async (userId, title, post) => {
  const posting = await postDao.posting(
    userId, 
    title, 
    post
    )
    return posting;
};

const postAll = async () => {
  const posting = await postDao.viewAll();
    return posting;
};
  
const postUser = async (userId) => {

  if (await postDao.viewUser(userId) == false){
    throw new Error('USER_IS_NOT_EXISTED')
  }
  const posting = await postDao.viewUser(userId);
    return posting
};
  
const postDelete = async ( postId, userId ) => {
  const postDelete = await postDao.postDelete( postId, userId );
    return postDelete
};
  
const postUpdate = async ( postId, title, post ) => {
  if (await postDao.checkPostExist(postId) == false) {
    throw new Error('POSTING_IS_NOT_EXISTED')
  }  
    const postUpdate = await postDao.postUpdate( postId, title, post );
      return postUpdate
};
  
const postLike = async ( postId, userId ) => {
  const postLike = await postDao.postLike( postId, userId );
    return postLike;
};

  
module.exports = {
    posting,
    postAll,
    postUser,
    postDelete,
    postUpdate,
    postLike
}