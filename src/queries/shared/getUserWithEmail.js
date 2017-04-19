const User = require('../../models/User');

const getUserWithEmail = (email) => {
  return User.findOne({email});
};

module.exports = getUserWithEmail;
