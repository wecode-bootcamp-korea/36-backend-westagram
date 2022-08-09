const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/", postController.postUpCtrl);
router.get("/list", postController.postGetCtrl);
router.patch("/:postId", postController.postPatchCtrl);
router.delete("/:postId", postController.postDeleteCtrl);
router.post("/:postId/likes/:userId", postController.postLikeCtrl);

module.exports = {
  router,
};
