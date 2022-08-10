"use strict";

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();


router.post('/posting', postController.posting);
router.get('/all', postController.getPostAll);
router.get('/user/:id', postController.getPostUser);
router.delete('/postNo/:no/userId/:id' ,postController.deletePost)
router.patch('/postNo/:no',postController.postUpdate)
router.post('/postNo/:no/userId/:id',postController.postLike)

module.exports = {
	router
}