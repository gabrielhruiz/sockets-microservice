const socketIo = require('socket.io');

const { loadUserSockets } = require('./namespaces/user');

const sockets = {};

const init = (server) => {
  const io = socketIo(server);
  sockets.user = loadUserSockets(io);
};

module.exports = {
  init,
  get: () => sockets
};
