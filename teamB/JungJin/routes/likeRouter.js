const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.get('/lookup', likeController.lookup)

router.post('/heart', likeController.heart)

module.exports = {
	router
}