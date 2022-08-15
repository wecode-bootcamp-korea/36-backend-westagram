const express = require('express');
const postsController = require('../Controller/postsController')

const router = express.Router();
const token = require("../middlewares/jwt")

router.post('/',token.validateToken,postsController.createPost)
router.get('/lists',token.validateToken,postsController.searchList)
router.patch('/users/:postId',token.validateToken, postsController.updatePost)
router.delete('/delete/:Id',token.validateToken ,postsController.deletePost)

module.exports = {router}