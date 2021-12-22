const fs = require('fs');
const https = require('https');
const socket = require('./socket');

/**
 * API
 */
const { app } = require('./api');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/**
 * SERVER
 */
const httpsOptions = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem'),
  requestCert: false,
  rejectUnauthorized: false
};
const server = https.createServer(httpsOptions, app);

/**
 * SOCKETS
 */
socket.init(server);

/**
 * STRAT SERVER
 */
server.listen(4000);
