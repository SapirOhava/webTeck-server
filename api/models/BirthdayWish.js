const mongoose = require('mongoose');

const birthdayWishSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sentByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dateReceived: {
    type: Date,
    default: Date.now,
  },
});

const BirthdayWish = mongoose.model('BirthdayWish', birthdayWishSchema);

module.exports = BirthdayWish;
