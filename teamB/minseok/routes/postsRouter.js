const express = require('express');
const postsController = require('../Controller/postsController')

const router = express.Router();

router.post('/', postsController.createPost)
router.get('/lists', postsController.searchList)
router.patch('/users/:postId', postsController.updatePost)
router.delete('/delete/:Id', postsController.deletePost)

module.exports = {router}