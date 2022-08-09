const postDao = require("../models/postDao");

const createPost = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);
  return createPost;
};

const getPost = async (title, content, userId) => {
  const readPost = await postDao.readPost(title, content, userId);
  return readPost;
};

const editPost = async (title, content, postId) => {
  const editPost = await postDao.editPost(title, content, postId);
  return editPost;
};

const deletePost = async (postId) => {
  const deletePost = await postDao.deletePost(postId);
  return deletePost;
};

const postLike = async (postId, userId) => {
  const likePost = await postDao.likePost(postId, userId);
  return likePost;
};

module.exports = {
  createPost,
  getPost,
  editPost,
  deletePost,
  postLike,
};

