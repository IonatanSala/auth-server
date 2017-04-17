const router = require('express').Router();
const UserController = require('../controllers/UserController');

router
  .post('/', UserController.create)
  .get('/verify/:userID/:emailKey', UserController.verifyEmail)
;

module.exports = router;
