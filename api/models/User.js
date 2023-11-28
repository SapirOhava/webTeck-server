const mongoose = require('mongoose');
const { Schema } = mongoose;
// example of a correct user input -
// {
//     username: 'John Doe',
//     birthday: new Date('1990-01-15T00:00:00.000Z'), // Date object representing 15th January 1990
//     email: 'johndoe@example.com'
//   }
// or
// {
//     username: 'John Doe',
//     birthday: '1990-01-15T00:00:00.000Z', // ISO 8601 date string
//     email: 'johndoe@example.com'
//   }

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  profilePictureURL: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
