const { createJWT } = require('../services/authentication');

const create = (req, res, next) => {
  const user = req.user;
  const jwtToken = createJWT(user);
  res.json({ token: jwtToken });
};

const AuthenticationController = {
  create
};

module.exports = AuthenticationController;
