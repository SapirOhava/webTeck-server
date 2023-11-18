const Log = require('./models/Log');

const logIn = async (userEmail) => {
  try {
    const log = new Log({
      type: 'loggedInLog',
      userEmail: userEmail,
    });
    log.save();
  } catch (error) {
    console.error('Error on logIn log:', error);
  }
};

const sendBirthdayWish = async (userEmail, sendToEmail) => {
  try {
    const log = new Log({
      type: 'sendBirthdayWishLog',
      userEmail: userEmail,
      sendToUserEmail: sendToEmail,
    });
    log.save();
  } catch (error) {
    console.error('Error on sendBirthdayWish log:', error);
  }
};
const signUp = async (userEmail) => {
  try {
    const log = new Log({
      type: 'signupLog',
      userEmail: userEmail,
    });
    await log.save();
  } catch (error) {
    console.error('Error on signUp log:', error);
  }
};

module.exports = {
  logIn,
  sendBirthdayWish,
  signUp,
};
