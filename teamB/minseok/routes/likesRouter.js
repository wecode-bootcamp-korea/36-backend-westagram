const express = require('express');
const likesController = require('../Controller/likesControllers')

const router = express.Router();
const takenCheck = require("../middlewares/jwt")

router.post('/posts',takenCheck.validateToken,likesController.likeList)

module.exports={router}