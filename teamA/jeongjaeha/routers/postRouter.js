"use strict";

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();


router.post('/posting', postController.posting);
router.get('/all', postController.getPostAll);
router.get('/user/:userId', postController.getPostUser);
router.delete('/postNo/:postId/userId/:userId' ,postController.deletePost)
router.patch('/postNo/:postId',postController.postUpdate)
router.post('/postNo/:postId/userId/:userId',postController.postLike)

module.exports = {
	router
}