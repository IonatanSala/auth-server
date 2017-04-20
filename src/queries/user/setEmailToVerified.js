const User = require('../../models/User');

const setEmailToVerified = (userID, emailKey) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      user = await User.findOne({ _id: userID });

    } catch(e) {
      return reject({ status: 400, errors: { details: 'Bad Request' }});
    }

    if(!user) return reject({ status: 400, errors: { details: 'Bad Request' }});

    if(user.emailVerified) return resolve({ data: { details: 'Your email has already been verified.'}});


    if(user.emailVerificationKey !== emailKey) {
      return reject({ status: 400, errors: { details: 'Bad Request' }});
    }

    user.emailVerified = true;
    user.emailVerificationKey = null;
    try {
      await user.save();
      return resolve({ data: { details: 'Your email is now verified.'}});
    } catch (e) {
      return reject({ status: 400, errors: { details: 'Bad Request' }});
    }
  });

}

module.exports = setEmailToVerified;
