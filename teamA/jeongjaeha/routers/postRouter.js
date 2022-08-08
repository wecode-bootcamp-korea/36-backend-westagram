"use strict";

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();


router.post('/posting', postController.posting);
router.get('/all', postController.getPostAll);
router.get('/user/:id', postController.getPostUser);
router.delete('/postNo/:no/userId/:id' ,postController.deletePost)
router.patch('/postNo/:no/userId/:id',postController.updatePost)
router.post('/postNo/:no/userId/:id',postController.likePost)

module.exports = {
	router
}