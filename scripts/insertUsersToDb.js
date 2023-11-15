// It's a standalone script you execute once to seed my database.
// i just used it once to seed my mongoDb Atlas
// there isn't a need for you to run it
// unless you want to seed your own db then
// 1.Open a terminal or command prompt.
// 2.Navigate to your project directory where this script is located.
// 3.Run the script using Node.js by executing node insertUsersToDb.js.
// This script will insert the users into your MongoDB database and then disconnect.

require('dotenv').config({ path: '../.env' });
const mongoose = require('../db');
const User = require('../api/models/User');

const insertUsers = async () => {
  const users = [
    {
      name: 'Sapir',
      birthday: '1992-04-24T00:00:00.000Z',
      email: 'sapir@gmail.com',
    },
    {
      name: 'Ori',
      birthday: '1990-11-15T00:00:00.000Z',
      email: 'ori@gmail.com',
    },
    {
      name: 'Tal',
      birthday: '1992-05-05T00:00:00.000Z',
      email: 'tal@gmail.com',
    },
    {
      name: 'Gal',
      birthday: '1990-11-15T00:00:00.000Z',
      email: 'gal@gmail.com',
    },
    {
      name: 'hadar',
      birthday: '1992-11-16T00:00:00.000Z',
      email: 'hadar@gmail.com',
    },
  ];

  try {
    await User.insertMany(users);
    console.log('Users inserted');
  } catch (error) {
    console.error('Error inserting users:', error);
  }
};

insertUsers().then(() => {
  mongoose.disconnect();
  console.log('mongoose disconnected after seeding users script');
});
