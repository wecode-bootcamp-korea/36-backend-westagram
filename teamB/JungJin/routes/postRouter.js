const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

const { validateToken } = require('../middlewares/auth.js');

router.get('/', validateToken, postController.lookup)

router.post('/upload', validateToken, postController.upload)

router.delete('/:postid', postController.del)

router.get('/image', postController.imagelookup)

router.get('/image/:userid', postController.imageuserlookup)

router.get('/title', postController.titlelookup)

router.get('/title/:postid', postController.titlepostlookup)

router.patch('/:postid', postController.postpatch)

module.exports = {
	router
}