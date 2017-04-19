const User = require('../../models/User');

const resetUserPassword = (_id, resetPasswordKey, password) => {
  password = User.hashPassword(password);
  return User.findOneAndUpdate({ _id, resetPasswordKey}, { password, resetPasswordKey: null });
}

module.exports = resetUserPassword;
