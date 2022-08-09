const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.createPost(title, content, userId);

    res.status(201).json({ message: "NEW POST CREATED!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const resultPost = await postService.getPost(title, content, userId);

    res.status(200).json(resultPost);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const editPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;

    const editPost = await postService.editPost(title, content, postId);

    res.status(201).json(editPost);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    await postService.deletePost(postId);

    res.status(200).json({ message: "Post Deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    await postService.postLike(postId, userId);
    
    res.status(201).json({ message: "Like Button Tapped!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getPost,
  editPost,
  deletePost,
  postLike,
};

