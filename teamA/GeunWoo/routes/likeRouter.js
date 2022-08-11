const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.post('/createLikes', likeController.createLikes);

module.exports = {
    router
}