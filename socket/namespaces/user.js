const { logger } = require('../../config/logger');

const { jwtAuth } = require('../middlewares/auth');

const onDisconnect = (socket) => {
  logger.info(`User disconnect: ${socket.payload.user}`);
  const { user, project } = socket.payload;
  socket.leave(project);
  socket.leave(user);
};

const sendMessage = (socket, msg) => {
  logger.info(`Message to: ${socket.payload.user}`);
  socket.emit('message', msg);
};

const onConnection = (socket) => {
  logger.info(`User connection: ${socket.payload.user}`);
  const { user, project } = socket.payload;
  socket.join(project);
  socket.join(user);

  socket.on('disconnect', () => onDisconnect(socket));

  socket.on('message', (msg) => sendMessage(socket, msg));
};

exports.loadUserSockets = (io) => {
  const userConn = io.of('/user').use(jwtAuth);
  userConn.on('connection', (socket) => onConnection(socket));
  return userConn;
};
