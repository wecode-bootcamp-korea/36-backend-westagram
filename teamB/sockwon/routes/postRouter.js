const express = require("express");
const postController = require("../controllers/postController");
const isNew = require("../middleware/isNew");
const router = express.Router();

const jwt = require('../middleware/jwt')

router.get('', jwt.validationToken, postController.getAllPost);
router.post('' ,jwt.validationToken, postController.newPost);
router.delete('', jwt.validationToken, postController.deletePost);
router.patch('', jwt.validationToken, postController.patchPost);
router.post("/login", isNew.isNewUser ,postController.logIn);


module.exports = {
    router
}



