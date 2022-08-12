//routes/postRouter.js

const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth")

const router = express.Router();

router.post("/post", auth.validateToken, postController.post);
router.get("/list", postController.getPostList);
router.get("/list/users/:userId", postController.getUserPost);
router.patch("/list/:postId", postController.patchPost);
router.delete("/list/:postId", postController.deletePost);
router.post("/list/:postId", postController.likePost);

module.exports = {
  router
};
