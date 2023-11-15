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
    { name: 'Sapir', birthdate: '1992-04-24', email: 'sapir@gmail.com' },
    { name: 'Or', birthdate: '1990-11-15', email: 'or@gmail.com' },
    { name: 'Tal', birthdate: '1992-05-05', email: 'tal@gmail.com' },
    { name: 'Gal', birthdate: '1990-11-15', email: 'gal@gmail.com' },
    { name: 'hadar', birthdate: '1992-11-16', email: 'hadar@gmail.com' },
  ];

  try {
    await User.insertMany(users);
    console.log('Users inserted');
  } catch (error) {
    console.error('Error inserting users:', error);
  }
};

insertUsers().then(() => mongoose.disconnect());
