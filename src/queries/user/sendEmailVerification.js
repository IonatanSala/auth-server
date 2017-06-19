const User = require('../../models/User');
const { sendEmailVerification } = require('../../services/emails');

const sendEmailVerificationToUser = (email) => {
  return new Promise(async (resolve, reject) => {

    let user;
    try {
      user = await User.findOne({email});
    } catch(e) {
      console.log('Couldn\'t find user');
      return reject(e)
    }

    if(!user) return reject({
      status: 400,
      errors: {
        email: {
          message: 'User doesn\'t exist'
        }
      }
    });

    if(user.emailVerified) return resolve({ data: { emailVerified: true, details: 'Email has already been verified' }})

    user.emailVerificationKey = User.createKey();
    try {
      await user.save();
    } catch(e) {
      console.log('Couldn\'t save user');
      console.log()
      return reject({status: 400, errorObject: e})
    }

    // send verification email
    try {
      await sendEmailVerification(user._id, user.emailVerificationKey, user.email);
    } catch(e) {
      return reject({
        status: 400,
        errors: {
          email: {
            message: 'Couldn\'t send verification email.'
          }
        }
      })
    }

    resolve({ data: { details: 'Verification link was sent to your email '}});
  });

}

module.exports = sendEmailVerificationToUser;
