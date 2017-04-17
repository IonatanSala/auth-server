const nodemailer = require('nodemailer');
const {
  HOST_URL,
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
    from: '"Jonatan" <getintouch@ionatansala.me>',
    to,
    subject: "Verify Your Email",
    text: `Copy and paste this link into your browser to verify your email address: ${HOST_URL}/users/verify/${userID}/${emailKey}`,
    html: `<a href="${HOST_URL}/users/verify/${userID}/${emailKey}" >Please click this link to validate your email address</a>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        console.log('Error');
        console.log(err);
      } else {
        console.log('Success');
        console.log(info);
      }

      if(err) reject(err);
      resolve(info);
    });
  });
}

module.exports = {
  sendEmailVerification
};
