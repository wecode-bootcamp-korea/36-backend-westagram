const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.postPostings);
router.get('/', postController.getPostings);
router.get('/:user_id', postController.getPostingsByUserId);
router.put('/', postController.updatePostings);
router.delete('/:post_id', postController.deletePostings);

module.exports = {
    router
}