const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get ('/', userController.search);

router.post('/sign-up', userController.signUp);

module.exports ={
    router
}
