if(process.env.NODE_ENV === 'production') {
  // require('dotenv').config()
} else {
  require('dotenv').config({ path: './.env.dev' });
}

const http = require('http');
const app = require('./app');
// Server Setup
const port = process.env.PORT;
// create a http server that knows how to receive http requests
// and forward it to the express application
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);
