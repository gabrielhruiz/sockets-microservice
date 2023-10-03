const fs = require('fs');
const https = require('https');
const http = require("http");
const cors = require('cors')
const env = require('./config/environment')
const socket = require('./socket');

const isAnHttpDeployment = env.PROTOCOL === 'HTTP';

/**
 * API
 */
const { app } = require('./api');

if (isAnHttpDeployment) {
  app.use(cors({ origin: '*' }));
}

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/**
 * SERVER
 */
const httpsOptions = {
  key: fs.existsSync('cert/key.pem') ? fs.readFileSync('cert/key.pem') : undefined,
  cert: fs.existsSync('cert/cert.pem') ? fs.readFileSync('cert/cert.pem') : undefined,
  requestCert: false,
  rejectUnauthorized: false
};

const httpOptions = {
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader); // only allow requests without 'origin' header
  }
};

const server = isAnHttpDeployment 
  ? http.createServer(httpOptions, app) 
  : https.createServer(httpsOptions, app);

/**
 * SOCKETS
 */
socket.init(server);

/**
 * STRAT SERVER
 */
// server.listen(4000);
const port = 4000;
const host = 'localhost';
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
