const postDao = require("../models/postDao");

const postUpCtrl = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);
  return createPost;
};

const postGetCtrl = async (title, content, userId) => {
  const readPost = await postDao.readPost(title, content, userId);
  return readPost;
};

const postPatchCtrl = async (title, content, postId) => {
  const editPost = await postDao.editPost(title, content, postId);
  return editPost;
};

const postDeleteCtrl = async (postId) => {
  const deletePost = await postDao.deletePost(postId);
  return deletePost;
};

const postLikeCtrl = async (postId, userId) => {
  const likePost = await postDao.likePost(postId, userId);
  return likePost;
};

module.exports = {
  postUpCtrl,
  postGetCtrl,
  postPatchCtrl,
  postDeleteCtrl,
  postLikeCtrl,
};
