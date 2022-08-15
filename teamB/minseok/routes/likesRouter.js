const express = require('express');
const likesController = require('../Controller/likesControllers')

const router = express.Router();
const token = require("../middlewares/jwt")

router.post('/posts',token.validateToken,likesController.likeList)

module.exports={router}