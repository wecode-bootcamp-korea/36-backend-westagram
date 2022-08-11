const express = require("express");
const likeController = require("../controllers/likeController");

const router = express.Router();

const jwt = require('../middleware/jwt')


router.post('/newlike', jwt.validationToken ,likeController.newLike);
module.exports = {
    router
}