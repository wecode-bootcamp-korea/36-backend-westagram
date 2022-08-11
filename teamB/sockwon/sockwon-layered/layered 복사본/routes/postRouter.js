const express = require("express");
const postController = require("../controllers/postController");
const isOldUser = require("../middleware/isNew");
const router = express.Router();

const jwt = require('../middleware/jwt')

router.get('/getallpost', jwt.validationToken, postController.getAllPost);
router.post('/newpost' ,jwt.validationToken, postController.newPost);
router.delete('/delete', jwt.validationToken, postController.deletePost);
router.patch('/patch', jwt.validationToken, postController.patchPost);
router.post("/login", isOldUser.isOldUser ,postController.logIn);


module.exports = {
    router
}