const express = require('express');
const postsController = require('../Controller/postsController')

const router = express.Router();
const takenCheck = require("../middlewares/jwt")

router.post('/',takenCheck.validateToken,postsController.createPost)
router.get('/lists',takenCheck.validateToken,postsController.searchList)
router.patch('/users/:postId',takenCheck.validateToken, postsController.updatePost)
router.delete('/delete/:Id',takenCheck.validateToken ,postsController.deletePost)

module.exports = {router}