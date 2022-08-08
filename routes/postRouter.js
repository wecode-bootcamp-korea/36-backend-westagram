const express = require('express');
const userController = require('../controllers/postController');

const router = express.Router();

router.post('/postsReg', userController.usersReg);

module.exports = {
    router
}   