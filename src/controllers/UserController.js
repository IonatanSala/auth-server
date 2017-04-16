const createNewUser = require('../queries/user/createNewUser');

const create = async (req, res, next) => {
  const newUser = req.body;
  try {
    res.json(await createNewUser(newUser));
  } catch(e) {
    res.status(e.status).json(e.errorObject);
  }
};

const UserController = {
  create
};

module.exports = UserController;
