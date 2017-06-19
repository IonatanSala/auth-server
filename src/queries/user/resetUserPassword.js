const User = require('../../models/User');

const resetUserPassword = (_id, resetPasswordKey, password) => {
  // console.log(_id);
  // console.log(resetPasswordKey);
  console.log(password);
  password = User.hashPassword(password);
  console.log(password);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOneAndUpdate({ _id, resetPasswordKey}, { password, resetPasswordKey: null });
      console.log(user);
      if(!user) return reject();
      resolve();
    } catch(e) {
      reject();
    }
  });
}

module.exports = resetUserPassword;
