const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/create', postController.posting);
router.post('/likes', postController.likes);
router.delete('/delete/:postId', postController.deleting);
router.get('/list', postController.getPostList);
router.patch('/update/:postId', postController.updatePost);

module.exports = {
    router
};