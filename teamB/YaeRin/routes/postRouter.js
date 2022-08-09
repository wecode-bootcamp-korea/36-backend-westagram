const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/", postController.createPost);
router.get("/list", postController.getPost);
router.patch("/:postId", postController.editPost);
router.delete("/:postId", postController.deletePost);
router.post("/:postId/likes/:userId", postController.postLike);

module.exports = {
  router,
};

