const postDao = require('../models/postDao')
const viewAllDao = require('../models/postDao')
const viewUserDao = require('../models/postDao')
const postDeleteDao = require('../models/postDao')
const postUpdateDao = require('../models/postDao')
const postLikeDao = require('../models/postDao')

const posting = async (user_id, title, post) => {
  const posting = await postDao.posting(
    user_id, 
    title, 
    post
    )
    return posting;
};

const postAll = async () => {
  const posting = await viewAllDao.viewAll();
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
  
const postUpdate = async ( no, title, post ) => {
  const postUpdate = await postUpdateDao.postUpdate( no, title, post );
    return postUpdate
};
  
const postLike = async ( no, id ) => {
  const postLike = await postLikeDao.postLike( no, id );
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