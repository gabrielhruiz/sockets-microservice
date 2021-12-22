const jwt = require('jsonwebtoken');

const { JWT_PRIVATE_KEY } = require('../../config/environment');

const getTokenFromRequest = (req) => {
  const { headers, query } = req;
  if (headers.authorization) {
    return headers.authorization.replace(/^Bearer\s/, '');
  } else if (query.token) {
    return query.token;
  }
  return '';
};

exports.jwtAuthenticate = (req, res, next) => {
  try {
    const options = { clockTolerance: 60 };
    const token = getTokenFromRequest(req);
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY, options);
    const { code } = decoded;
    if (!code || code !== JWT_PRIVATE_KEY) {
      const error = { message: 'Invalid access token' };
      return res.status(401).json(error);
    }
    return next();
  } catch (error) {
    return res.status(403).json(error);
  }
};
