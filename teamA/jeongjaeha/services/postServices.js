const postDao = require('../models/postDao')
const viewAllDao = require('../models/viewAllDao')
const viewUserDao = require('../models/viewUserDao')
const postDeleteDao = require('../models/postDeleteDao')
const postUpdateDao = require('../models/postUpdateDao')
const postLikeDao = require('../models/postLikeDao')

const posting = async (user_id, title, post) => {
  const posting = await postDao.posting(
    user_id, 
    title, 
    post
    )
    return posting;
};

const postAll = async () => {
  const posting = await viewallDao.posting();
    return posting;
};
  
const postUser = async ( id ) => {
  const posting = await viewUserDao.viewUser( id );
    return posting
};
  
const postDelete = async ( no, id ) => {
  const postDelete = await postDeleteDao.postDelete( no, id );
    return postDelete
};
  
const updatePost = async ( no, id, post ) => {
  const updatePost = await postUpdateDao.updatePost( no, id, post );
    return updatePost
};
  
const likePost = async ( no, id ) => {
  const likePost = await postLikeDao.likePost( no, id );
    return likePost;
};

  
module.exports = {
    posting,
    postAll,
    postUser,
    postDelete,
    updatePost,
    likePost
}