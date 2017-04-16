const authenticationRouter = require('./authenticationRoutes');
const userRoutes = require('./userRoutes');

const router = (app) => {
  app
    .use('/authentication', authenticationRouter)
    .use('/users', userRoutes)
  ;
};

module.exports = router;
