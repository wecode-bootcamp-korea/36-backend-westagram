const express = require('express');
const userController = require('../Controller/userController')

const router = express.Router();
const token = require("../middlewares/jwt")

router.post('/',userController.signUp);
router.get('/lists/:id',token.validateToken ,userController.searchUserList)
router.post('/signIn', userController.signIn);
module.exports = {router}