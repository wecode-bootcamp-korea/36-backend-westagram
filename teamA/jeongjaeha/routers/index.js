"use strict";

const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");


router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/viewPosts", postRouter.router);
router.use("/deletePost", postRouter.router);
router.use("/updatePost",postRouter.router);
router.use("/likePost", postRouter.router);



module.exports = router;