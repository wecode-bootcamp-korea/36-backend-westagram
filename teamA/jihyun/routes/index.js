//routes/index.js

const express = require("express");
const router = express.Router();

// users/signup
const userRouter = require("./userRouter");
router.use("/users", userRouter.router);

// posts/post
const postRouter = require("./postRouter");
router.use("/posts", postRouter.router);

// posts/list
const postListRouter = require("./postRouter");
router.use("/posts", postListRouter.router);

// posts/list/users
const userpostRouter = require("./postRouter");
router.use("/posts", userpostRouter.router);

// posts/list
const postEditRouter = require("./postRouter");
router.use("/posts", postEditRouter.router);

// posts/list
const postDeleteRouter = require("./postRouter");
router.use("/posts", postDeleteRouter.router);

// post/list
const postLikedRouter = require("./postRouter");
router.use("/posts", postLikedRouter.router);

module.exports = router

