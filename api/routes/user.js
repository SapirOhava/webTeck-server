const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, userController.getUsers);
router.get('/todayBirthday', checkAuth, userController.getTodaysBirthdays);
router.post('/logBirthdayWish', checkAuth, userController.logBirthdayWish);

router.post('/signup', userController.users_signup);
router.post('/login', userController.users_login);

module.exports = router;
