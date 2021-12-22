const jwt = require('jsonwebtoken');

const jwtAuth = (socket, next) => {
  try {
    const { token } = socket.handshake.query;
    const decoded = jwt.verify(token, 'qwerty1234567890');
    const { sub, project } = decoded;

    const [namespace, sid] = socket.id.split('#');
    const payload = {
      user: sub, project, sid, namespace, id: socket.id
    };
    socket.payload = payload;
    return next();
  } catch (error) {
    return next(new Error(error.message));
  }
};

module.exports = { jwtAuth };
