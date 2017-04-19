const createNewUser = require('../queries/user/createNewUser');
const setEmailToVerified = require('../queries/user/setEmailToVerified');
const { sendResetPasswordEmail } = require('../services/emails');
const resetUserPassword = require('../queries/user/resetUserPassword');

const create = async (req, res, next) => {
  const newUser = req.body;
  try {
    res.json(await createNewUser(newUser));
  } catch(e) {
    res.status(e.status).json(e.errorObject);
  }
};

const verifyEmail = async (req, res, next) => {
  const { emailKey, userID } = req.params;
  try {
    const response = await setEmailToVerified(userID, emailKey);
    res.json(response);
  } catch(e) {
    console.log(e);
    res.status(404).json(e.errors);
  }
}

const resetPassword = async (req, res, next) => {
  const { email } = req.params;

  try {
    const response = await sendResetPasswordEmail(email);
    res.json(response);
  } catch(e) {
    res.status(404).json(e);
  }
};


const updatePassword = async (req, res, next) => {
  const { id, resetKey, newPassword } = req.body;

  try {
    await resetUserPassword(id, resetKey, newPassword);
    res.json({ data: { details: "Your password has been updated."}});
  } catch(e) {
    console.log(e);
    res.status(400).json({ errors: { message: 'Bad Request' }});
  }
}

const UserController = {
  create,
  verifyEmail,
  resetPassword,
  updatePassword
};

module.exports = UserController;
