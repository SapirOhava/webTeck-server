const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, groupController.createGroup);
router.get('/', checkAuth, groupController.getAllGroups);
router.get('/search', groupController.searchGroups);
module.exports = router;
