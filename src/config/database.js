const mongoose = require('mongoose');
// configure Promises
mongoose.Promise = global.Promise;
// database uri
const dbUri = process.env.DB_URI || 'mongodb://localhost/authenticationService';
const reconnectInterval = 100;
const reconnectTries = 600;

const dbSetup = () => {
  return new Promise((resolve, reject) => {

    let currentReconnectTries = 0;
    mongoose.connection.on("connected", () => {
      clearInterval(tryConnectDBInterval);
      return resolve();
    });

    mongoose.connection.on("error", (err) => {
      currentReconnectTries++;
      if(currentReconnectTries === reconnectTries) {
        clearInterval(tryConnectDBInterval);
        return reject();
      }
    });

    const tryConnectDBInterval = setInterval(() => {
      console.log('Trying to connect to db...');
      mongoose.connect(dbUri).
        then(
          () => { console.log('Connected to db') },
          (err) => { console.log('Error connecting to db'); }
        )
    }, reconnectInterval);

  });

}
module.exports = dbSetup;
