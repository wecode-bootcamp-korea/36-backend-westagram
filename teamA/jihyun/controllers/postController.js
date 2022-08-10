//controller/postController.js

const postService = require("../services/postService");

const post = async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.post(userId, title, content);
    return res.status(201).json({
      message: "POST_CREATED_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostList = async (req, res) => {
  try {
    const postList = await postService.getPostList();
    res.status(200).json(postList);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;

    const userPost = await postService.getUserPost(userId);
    res.status(200).json(userPost);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const patchPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { postingContent } = req.body;

    if (!postingContent || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.patchPost(postId, postingContent);
    return res.status(204).json({
      message: "POST_EDIT_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.deletePost(postId);
    return res.status(200).json({
      message: "POST_DELETE_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.likePost(userId, postId);
    return res.status(201).json({
      message: "LIKE_CREATED_SUCCESS",
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  post,
  getPostList,
  getUserPost,
  patchPost,
  deletePost,
  likePost
};
