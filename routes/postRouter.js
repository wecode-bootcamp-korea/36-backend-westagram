const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/postsReg', postController.postsReg);
router.get('/postsGet', postController.postsGet);
router.get('/postsByUserId/:user_id', postController.postsByUserId);
router.put('/postsUpdate',postController.postsUpdate);
router.delete('/postsDel/:postId', postController.postDel);
router.post('/like', postController.like);

module.exports = {
    router
}   