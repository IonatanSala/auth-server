const authenticationRouter = require('./authenticationRoutes');
const userRoutes = require('./userRoutes');

const router = (app) => {
  app
    .use('/authentication', authenticationRouter)
    .use('/users', userRoutes)
    .get('*', (req, res) => {
      res.status(404).send('Not found');
    })
  ;
};

module.exports = router;
