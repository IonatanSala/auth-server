const nodemailer = require('nodemailer');
const getUserWithEmail = require('../queries/shared/getUserWithEmail');

let smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

let transporter = nodemailer.createTransport(smtpConfig);
const sendEmailVerification = (userID, emailKey, to) => {
  let mailOptions = {
    from: '"Authentication Service" <getintouch@ionatansala.me>',
    to,
    subject: "Verify Your Email",
    text: `Copy and paste this link into your browser to verify your email address: ${process.env.CLIENT_URL}/verify/${userID}/${emailKey}`,
    html: `<a href="${process.env.CLIENT_URL}/verify/${userID}/${emailKey}" >Please click this link to validate your email address</a>`
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
      text: `Copy and paste this link into your browser to reset your password: ${process.env.CLIENT_URL}/resetPassword/${user._id}/${user.resetPasswordKey}`,
      html: `<a href="${process.env.CLIENT_URL}/resetPassword/${user._id}/${user.resetPasswordKey}" >Please click this link to change your password</a>`
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
