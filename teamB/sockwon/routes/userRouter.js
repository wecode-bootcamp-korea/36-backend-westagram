const express = require('express');
const userController = require('../controllers/userController');
const isNew = require("../middleware/isNew");
const router = express.Router();

router.post('/signup', isNew.isNewUser ,userController.signUp);

module.exports = {
	router
}