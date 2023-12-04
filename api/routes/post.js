const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, postController.createPost);
router.get('/user/:userId', checkAuth, postController.getUsersPosts);
router.put('/:postId/like', checkAuth, postController.likePost);
router.delete('/:postId', checkAuth, postController.deletePost);
module.exports = router;
