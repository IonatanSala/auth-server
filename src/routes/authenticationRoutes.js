const router = require('express').Router();
const passport = require('passport');
const AuthenticationController = require('../controllers/AuthenticationController');

router
  .post('/', passport.authenticate('local', { session: false }), AuthenticationController.create)
;

module.exports = router;
