const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/:userId', postController.postRegist);
router.get('',postController.allPost);
router.get('/:userId', postController.userPost);
router.patch('/:userId/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);
router.post('/like/:postId', postController.likePost);

module.exports = {
    router
}