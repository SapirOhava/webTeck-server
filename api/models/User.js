const mongoose = require('mongoose');
const { Schema } = mongoose;
// example of a correct user input -
// {
//     name: 'John Doe',
//     birthday: new Date('1990-01-15T00:00:00.000Z'), // Date object representing 15th January 1990
//     email: 'johndoe@example.com'
//   }
// or
// {
//     name: 'John Doe',
//     birthday: '1990-01-15T00:00:00.000Z', // ISO 8601 date string
//     email: 'johndoe@example.com'
//   }

const userSchema = new Schema({
  name: {
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
