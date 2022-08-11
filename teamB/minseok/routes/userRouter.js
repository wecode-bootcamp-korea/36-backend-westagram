const express = require('express');
const userController = require('../Controller/userController')

const router = express.Router();

router.post('/', userController.signUp);
router.get('/lists/:id', userController.searchUserList)
module.exports = {router}