const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.get("/:userId/posts", userController.userPostList);

module.exports = {
  router,
};
