const express = require('express');
const postController =require('../controllers/postController');

const router = express.Router();

router.post('/new', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:userId', postController.getUserPosts);
router.patch('/:userId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports={
    router
}