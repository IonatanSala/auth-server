const nodemailer = require('nodemailer');
const getUserWithEmail = require('../queries/shared/getUserWithEmail');

const {
  HOST_URL,
  CLIENT_URL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USER,
  EMAIL_PASS } = require('../config');

let smtpConfig = {
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_SECURE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
};

let transporter = nodemailer.createTransport(smtpConfig);
const sendEmailVerification = (userID, emailKey, to) => {
  let mailOptions = {
    from: '"Authentication Service" <getintouch@ionatansala.me>',
    to,
    subject: "Verify Your Email",
    text: `Copy and paste this link into your browser to verify your email address: ${CLIENT_URL}/verify/${userID}/${emailKey}`,
    html: `<a href="${CLIENT_URL}/verify/${userID}/${emailKey}" >Please click this link to validate your email address</a>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) reject(err);
      resolve(info);
    });
  });
}

const sendResetPasswordEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    let user;
    try {
      user = await getUserWithEmail(email);
    } catch(e) {
      return reject({ errors: { message: 'Record could not be found'}});
    };

    if(!user) return reject({ errors: { message: 'Record could not be found'}});

    user.setPasswordKey();

    try {
      await user.save();
    } catch(e) {
      return reject({ errors: { message: 'Something went wrong please try again.'}});
    }

    let mailOptions = {
      from: '"Reset Your Password" <getintouch@ionatansala.me>',
      to: user.email,
      subject: "Reset Your Password",
      text: `Copy and paste this link into your browser to reset your password: ${CLIENT_URL}/resetPassword/${user._id}/${user.resetPasswordKey}`,
      html: `<a href="${CLIENT_URL}/resetPassword/${user._id}/${user.resetPasswordKey}" >Please click this link to change your password</a>`
    };

    try {
      await new Promise(async (resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
          if(err) reject(err);
          resolve(info);
        });
      });
    } catch(e) {
      return reject({ errors: { message: 'Something went wrong please try again.'}});
    }

    resolve({ data: { details: 'Reset instructions has been sent to your email'}});
  });
};

module.exports = {
  sendEmailVerification,
  sendResetPasswordEmail
};
