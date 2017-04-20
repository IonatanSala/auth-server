const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const { CLIENT_URL } = require('./config');
const router = require('./routes/router');
const app = express();
// authentication services setup
require('./services/authentication');
// setup database
const DBSetup = require('./config/database');
DBSetup()
  // database is connected
  .then(() => {

    const corsOptions = {
      origin: CLIENT_URL,
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    app.use(morgan('combined'));
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: "application/json" }));
    app.use(passport.initialize());
    app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
      res.send('success');
    });
    router(app);
  })
  // couldn't connect to the database
  .catch((e) => {
    app.use((req, res, next) => {
      res.send('Something went wrong please try again later.');
      next();
    })
  });

module.exports = app;
