const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

router.get('/search', userController.searchUsers);
router.get('/todayBirthday', checkAuth, userController.getTodaysBirthdays);
router.post('/BirthdayWish', checkAuth, userController.sendBirthdayWish);
router.get('/BirthdayWish', checkAuth, userController.getBirthdayWishes);
router.post('/signup', userController.users_signup);
router.post('/login', userController.users_login);
router.get('/:userId', checkAuth, userController.getUserById);
router.get('/', checkAuth, userController.getUsers);

module.exports = router;
