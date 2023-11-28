const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  //   isPrivate: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   coverImage: {
  //     type: String, // URL to the image
  //   },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
