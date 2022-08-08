const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.user('/usersReg', userController.usersReg);

module.exports = {
    router
}