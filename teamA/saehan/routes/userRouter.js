const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signUp", userController.signUp);
router.get("/posts/:userId", userController.posts);

module.exports = {
    router
}