const express = require('express');
const postController =require('../controllers/postController');

const router = express.Router();

router.post('/new', postController.enrollPost);
router.get('/all', postController.allPost);
router.get('/:userId', postController.userPost);
router.put('/:userId', postController.fixPost);

module.exports={
    router
}