const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const likeRouter = require("./likeRouter");
const validateToken = require('../middilewares/jwtValidation');

router.use("/user", userRouter.router);
router.use("/post", validateToken.validateToken ,postRouter.router);
router.use("/like", likeRouter.router);


module.exports = router;