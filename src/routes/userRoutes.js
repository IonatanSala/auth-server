const router = require('express').Router();
const UserController = require('../controllers/UserController');

router
  .post('/', UserController.create)
  .get('/verify/:userID/:emailKey', UserController.verifyEmail)
  .get('/sendVerificationEmail/:email', UserController.sendVerificationEmail)
  .get('/resetPassword/:email', UserController.resetPassword)
  .put('/resetPassword', UserController.updatePassword)
;

module.exports = router;
