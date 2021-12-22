const express = require('express');
const bodyParser = require('body-parser');

const { jwtAuthenticate } = require('../api/middlewares/auth');

const user = require('../api/controllers/user');

const bodyParserJson = bodyParser.json({
  limit: '5mb'
});
const bodyParserUrl = bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
  parameterLimit: 50000
});

const app = express();
app.use(bodyParserJson, bodyParserUrl);

app.use('/api/user', jwtAuthenticate, user);

module.exports = { app };
