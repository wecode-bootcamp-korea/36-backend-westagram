//service/postService.js

const postDao = require("../models/postDao");

const post = async (userId, title, content) => {
  if (title.trim().length == 0 || content.trim().length == 0) {
    const err = new Error("TITLE_OR_CONTENT_IS_EMPTY");
    err.statusCode = 400;
    throw err;
  }
  const createPost = await postDao.createPost(userId, title, content);

  return createPost;
};

const getPostList = async () => {
  const selectPost = await postDao.getPostList();

  return selectPost;
};

const getUserPost = async (userId) => {
  const selectUserPost = await postDao.getUserPost(userId);

  return JSON.parse(Object.values(selectUserPost[0]));
};

const patchPost = async (postId, postingContent) => {
  const postIdValidation = new RegExp(/^\d+$/);

  if (!postIdValidation.test(postId)) {
    const err = new Error("POST_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
    } 

  const updatePost = await postDao.patchPost(postId, postingContent);

  return updatePost;
};

const deletePost = async (postId) => {
  const postIdValidation = new RegExp(/^\d+$/);

  if(!postIdValidation.test(postId)) {
    const err = new Error("POST_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const deletePost = await postDao.deletePost(postId);

  return deletePost;
}

const likePost = async (userId, postId) => {
  const postIdValidation = new RegExp(/^\d+$/);

  if(!postIdValidation.test(postId)) {
    const err = new Error("POST_ID_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const likePost = await postDao.likePost(userId, postId);

  return likePost;
}

module.exports = {
  post,
  getPostList,
  getUserPost,
  patchPost,
  deletePost,
  likePost
};
