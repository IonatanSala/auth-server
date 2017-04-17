const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const router = require('./routes/router');
const app = express();
// authentication services setup
require('./services/authentication');
// setup database
const DBSetup = require('./config/database');
DBSetup()
  .then(() => {
    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: "application/json" }));
    app.use(passport.initialize());
    app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
      res.send('success');
    });
    router(app);
  })
  .catch((e) => {
    app.use((req, res, next) => {
      res.send('Something went wrong please try again later.');
      next();
    })
  });

module.exports = app;