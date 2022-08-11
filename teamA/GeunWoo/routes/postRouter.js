const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/postPostings', postController.postPostings);
router.get('/getPostings', postController.getPostings);
router.get('/getPostingsByUserId/:user_id', postController.getPostingsByUserId);
router.put('/updatePostings', postController.updatePostings);
router.delete('/deletePostings/:post_id', postController.deletePostings);

module.exports = {
    router
}