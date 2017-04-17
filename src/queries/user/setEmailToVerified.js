const User = require('../../models/User');

const setEmailToVerified = (userID, emailKey) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      user = await User.findOne({ _id: userID });
    } catch(e) {
      return reject({ status: 404, errors: { details: 'The resource your looking for does not exist.' }});
    }

    if(user.emailVerified) return resolve({ data: { details: 'Your email has already been verified.'}});


    if(user.emailVerificationKey !== emailKey) {
      return reject({ status: 404, errors: { details: 'The resource your looking for does not exist.' }});
    }

    user.emailVerified = true;
    try {
      await user.save();
      return resolve({ data: { details: 'Your email is now verified.'}});
    } catch (e) {
      return reject({ status: 404, errors: { details: 'The resource your looking for does not exist.' }});
    }
  });

}

module.exports = setEmailToVerified;
