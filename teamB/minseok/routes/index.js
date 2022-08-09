const express = require("express");
const router = express.Router();

const userRouter =  require("./userRouter");
const postsRouter = require("./postsRouter");
const likesRouter = require("./likesRouter")

router.use("/users", userRouter.router);
router.use("/posts", postsRouter.router);
router.use("/likes", likesRouter.router);

module.exports = router;