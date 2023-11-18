const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['sendBirthdayWishLog', 'loggedInLog', 'loggedOutLog', 'signupLog'],
  },
  userEmail: {
    type: String,
    required: true,
  },
  sendToUserEmail: {
    type: String,
    required: function () {
      return this.type === 'sendBirthdayWishLog';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
