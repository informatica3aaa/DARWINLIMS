import dotenv from 'dotenv';
import App from '../app';
import debug from 'debug';

dotenv.config();
debug('minerals:server');


const port = normalizePort(process.env.PORT || '3001');
const port1 = normalizePort(process.env.PORT1 || '3000');

const config = {
  port: port,
  port1:port1,
  session_secret: process.env.SESSION_SECRET,
  api_gateway_url: process.env.API_GATEWAY_URL
}

const app = new App(config);
app.initialize();

const server = app.start();
server.on('error', onServerError);
server.on('listening', onServerListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onServerError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onServerListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
