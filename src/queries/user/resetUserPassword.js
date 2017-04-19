const User = require('../../models/User');

const resetUserPassword = (_id, resetPasswordKey, password) => {
  password = User.hashPassword(password);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOneAndUpdate({ _id, resetPasswordKey}, { password, resetPasswordKey: null });
      if(!user) return reject();
      resolve();
    } catch(e) {
      reject();
    }
  });
}

module.exports = resetUserPassword;
