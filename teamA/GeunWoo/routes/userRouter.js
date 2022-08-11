const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/createUsers', userController.createUsers);

module.exports = {
    router
}