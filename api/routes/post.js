const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, postController.createPost);

module.exports = router;
