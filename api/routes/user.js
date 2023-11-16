const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/todayBirthday', userController.getTodaysBirthdays);
router.post('/logBirthdayWish', userController.logBirthdayWish);

module.exports = router;
