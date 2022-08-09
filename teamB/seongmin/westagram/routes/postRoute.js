const express = require('express');
const postControllers = require('../controllers/postController');

const router = express.Router();

router.get('/', postControllers.searchPosts);

router.get('/:userId', postControllers.searchUserPost);

router.post('/', postControllers.createPost);

router.patch('/:postId',postControllers.patchPost);

router.delete('/:postId', postControllers.deletePost);

module.exports = {
    router
}