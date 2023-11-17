const User = require('../models/User');
const Log = require('../models/Log');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTodaysBirthdays = async (req, res) => {
  try {
    // get today's date in local time
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Month is 0-indexed

    const usersWithBirthdayToday = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$birthday' }, day] },
          { $eq: [{ $month: '$birthday' }, month] },
        ],
      },
    });

    res.status(200).json(usersWithBirthdayToday);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logBirthdayWish = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const newLogEntry = new Log({
      userId,
      message,
      type: 'birthdayWishLog',
    });
    await newLogEntry.save();

    res.status(200).json({ message: 'Birthday wish logged successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.users_signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userExist = await User.find({ email: req.body.email }).exec();
    if (userExist.length >= 1) {
      return res.status(409).json({
        message: 'Mail already exist',
      });
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      birthday: req.body.birthday,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.users_login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed',
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h',
        }
      );
      return res.status(200).json({
        message: 'Auth successful',
        token,
      });
    }
    return res.status(401).json({
      message: 'Auth failed',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
