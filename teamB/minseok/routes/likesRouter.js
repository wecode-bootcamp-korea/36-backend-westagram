const express = require('express');
const likesController = require('../Controller/likesControllers')

const router = express.Router();

router.post('/posts', likesController.likeList)

module.exports={router}