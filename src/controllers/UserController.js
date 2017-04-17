const createNewUser = require('../queries/user/createNewUser');
const setEmailToVerified = require('../queries/user/setEmailToVerified');

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

const UserController = {
  create,
  verifyEmail
};

module.exports = UserController;
