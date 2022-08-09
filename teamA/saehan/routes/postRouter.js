const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.get("/all", postController.allPosts);
router.post("/posts", postController.posting);
router.patch("/:userId/:postId", postController.update);
router.delete("/:postId", postController.deletePost);

module.exports = {
    router
}