const User = require('../models/User');
const BirthdayWish = require('../models/BirthdayWish');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../../s3');

const {
  logInLog,
  sendBirthdayWishLog,
  signUpLog,
} = require('../Utility/logger');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (req.file) {
      const file = req.file;
      const result = await uploadFile(file);
      user.profilePictureURL = result.Location;
    }

    const { username, birthday } = req.body; //later needs to add email and password checking and savings
    if (username) user.username = username;
    if (birthday) user.birthday = birthday;

    await user.save();

    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json({ user: userObject });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//check if i return here also the password
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.name;
    // Using a regular expression to enable case-insensitive and partial matching
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

    const users = await User.find({ username: regex });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodaysBirthdays = async (req, res) => {
  try {
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

exports.getBirthdayWishes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const birthdayWishes = await BirthdayWish.find({ user: userId }).populate(
      'sentByUsers'
    );

    res.status(200).json(birthdayWishes);
  } catch (error) {
    console.error('Error fetching birthday wishes:', error);
    res.status(500).send(error.message);
  }
};

exports.sendBirthdayWish = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { sendToEmail } = req.body;
    let sendToUser = await User.findOne({ email: sendToEmail });
    let senderUser = await User.findOne({ email: userEmail });
    if (!sendToUser || !senderUser) {
      throw new Error('user does not exist');
    }
    let wish = await BirthdayWish.findOne({ user: sendToUser._id });
    if (wish && wish.sentByUsers.includes(senderUser._id)) {
      return res.status(400).json({ message: 'Birthday wish already sent' });
    }
    if (!wish) {
      wish = new BirthdayWish({
        user: sendToUser,
        sentByUsers: [senderUser._id],
      });
    } else {
      wish.sentByUsers.push(senderUser._id);
    }
    await wish.save();
    await sendBirthdayWishLog(userEmail, sendToEmail);
    res.status(200).json({
      message: 'Happy Birthday Wish Sent successfully ',
    });
  } catch (error) {
    console.error('Error adding birthday wish:', error);
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
    await signUpLog(req.body.email);

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
          id: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: '24h',
        }
      );

      await logInLog(user.email);

      // Since Mongoose models are rich objects, they can't be modified directly.
      // However, you can convert the model instance to a regular JavaScript object and
      // then delete the password property.
      // .toObject() method provided by Mongoose, converts the Mongoose model instance into a plain JavaScript object.

      const userObject = user.toObject();
      delete userObject.password;

      return res.status(200).json({
        message: 'Auth successful',
        token,
        user: userObject,
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
