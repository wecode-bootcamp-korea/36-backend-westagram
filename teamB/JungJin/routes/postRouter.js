const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/lookup', postController.lookup)

router.post('/upload', postController.upload)

router.delete('/del/:postid', postController.del)

router.get('/image/lookup', postController.imagelookup)

router.get('/image/lookup/:userid', postController.imageuserlookup)

router.get('/title/lookup', postController.titlelookup)

router.get('/title/lookup/:postid', postController.titlepostlookup)

router.patch('/update/:postid', postController.postpatch)

module.exports = {
	router
}