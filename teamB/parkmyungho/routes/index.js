const express = require('express');
const router = express.Router();

const userRouter = require("./userRouter");
//users 일 때 userRouter 파일의 router 모듈을 불러온다.
router.use("/users", userRouter.router);


module.exports = router;