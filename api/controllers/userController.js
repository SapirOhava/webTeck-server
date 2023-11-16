const User = require('../models/User');
const Log = require('../models/Log');

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
