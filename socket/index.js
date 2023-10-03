const socketIo = require('socket.io');

const env = require('../config/environment')
const { loadUserSockets } = require('./namespaces/user');

const sockets = {};

const init = (server) => { 
  const httpConfig = {
    cors: { origin: '*' }
  };
  const config = env.PROTOCOL === 'HTTP' ? httpConfig : {};

  const io = socketIo(server, config);
  sockets.user = loadUserSockets(io);
};

module.exports = {
  init,
  get: () => sockets
};
