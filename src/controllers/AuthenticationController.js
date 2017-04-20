const { createJWT } = require('../services/authentication');

const create = (req, res, next) => {
  const user = req.user;
  if(!user.emailVerified) return res.status(401).json({errors: { message: 'You have to verify your email before signing in' }});
  const jwtToken = createJWT(user);
  res.json({ token: jwtToken });
};

const AuthenticationController = {
  create
};

module.exports = AuthenticationController;
