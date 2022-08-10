const postDao = require('../models/postDao')


const posting = async (user_id, title, post) => {
  const posting = await postDao.posting(
    user_id, 
    title, 
    post
    )
    return posting;
};

const postAll = async () => {
  const posting = await postDao.viewAll();
    return posting;
};
  
const postUser = async ( id ) => {
  const posting = await postDao.viewUser( id );
    return posting
};
  
const postDelete = async ( no, id ) => {
  const postDelete = await postDao.postDelete( no, id );
    return postDelete
};
  
const postUpdate = async ( no, title, post ) => {
  const postUpdate = await postDao.postUpdate( no, title, post );
    return postUpdate
};
  
const postLike = async ( no, id ) => {
  const postLike = await postDao.postLike( no, id );
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