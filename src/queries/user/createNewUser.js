const User = require('../../models/User');
const { createJWT } = require('../../services/authentication');

const createNewUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      user = await User.findOne({ email: newUser.email })
    } catch(e) {
      reject({status: 400, errorObject: e})
    }

    if(user) {
      reject({
        status: 400,
        errorObject: {
          errors: {
            email: {
              message: 'Email is already in use'
            }
          }
        }
      })
    }

    newUser.password = User.hashPassword(newUser.password);
    const newUserInstance = new User(newUser);

    try {
      await newUserInstance.save();
    } catch(e) {
      reject({status: 400, errorObject: e})
    }

    let createdUser;
    try {
      createdUser = await User.findOne({email: newUser.email}, { password: 0 });
    } catch(e) {
      reject({status: 400, errorObject: e})
    };

    resolve({ token: createJWT(createdUser) });
  });
};

module.exports = createNewUser;
