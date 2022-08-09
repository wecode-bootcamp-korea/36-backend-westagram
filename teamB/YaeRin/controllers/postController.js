const postService = require("../services/postService");

const postUpCtrl = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.postUpCtrl(title, content, userId);

    res.status(201).json({ message: "NEW POST CREATED!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postGetCtrl = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const resultPost = await postService.postGetCtrl(title, content, userId);

    res.status(200).json(resultPost);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postPatchCtrl = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { postId } = req.params;

    const editPost = await postService.postPatchCtrl(title, content, postId);

    res.status(201).json(editPost);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postDeleteCtrl = async (req, res) => {
  try {
    const { postId } = req.params;

    await postService.postDeleteCtrl(postId);

    res.status(200).json({ message: "Post Deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postLikeCtrl = async (req, res) => {
  try {
    const { postId, userId } = req.params;

    await postService.postLikeCtrl(postId, userId);
    
    res.status(201).json({ message: "Like Button Tapped!" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  postUpCtrl,
  postGetCtrl,
  postPatchCtrl,
  postDeleteCtrl,
  postLikeCtrl,
};
