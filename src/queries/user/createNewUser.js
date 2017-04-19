const User = require('../../models/User');
const { sendEmailVerification } = require('../../services/emails');
const { createJWT } = require('../../services/authentication');

const createNewUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      user = await User.findOne({ email: newUser.email })
    } catch(e) {
      return reject({status: 400, errorObject: e})
    }

    if(user) {
      return reject({
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

    if(newUser.password.length < 8) {
      return reject({
        status: 400,
        errorObject: {
          errors: {
            password: {
              message: 'password must be at least 8 characters long'
            }
          }
        }
      });
    }


    newUser.password = User.hashPassword(newUser.password);
    newUser.emailVerificationKey = User.createKey();
    const newUserInstance = new User(newUser);

    try {
      await newUserInstance.save();
    } catch(e) {
      return reject({status: 400, errorObject: e})
    }

    let createdUser;
    try {
      createdUser = await User.findOne({email: newUser.email}, { password: 0 });
    } catch(e) {
      return reject({status: 400, errorObject: e})
    };

    // send verification email
    try {
      await sendEmailVerification(createdUser._id, createdUser.emailVerificationKey, createdUser.email);
    } catch(e) {
      return reject({
        status: 400,
        errorObject: {
          errors: {
            email: {
              message: 'Couldn\'t send verification email.'
            }
          }
        }
      })
    }

    resolve({ token: createJWT(createdUser) });
  });
};

module.exports = createNewUser;
