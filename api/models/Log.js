const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ['birthdayWishLog', 'otherLogType1', 'otherLogType2'],
    required: true,
  },
});

module.exports = mongoose.model('Log', logSchema);
