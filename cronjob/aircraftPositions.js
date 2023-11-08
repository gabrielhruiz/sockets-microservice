const { CronJob } = require('cron');
const positions = require('./positions.json');
const sockets = require('../socket');

const CRONTIME = '*/10 * * * * *';
const MESSAGE_BODY = {
  type: 'ADS-B',
  message: []
};

const currentPositions = positions;

const sendAircraftPositions = () => {
  MESSAGE_BODY.message = currentPositions;

  const { user } = sockets.get();
  user.emit('message', MESSAGE_BODY);

  console.log(`[${new Date()}] - Send`);
  currentPositions.forEach((position) => {
    position.lat += 0.1;
    position.lon -= 0.1;
    position.trk += 10;
  });
};

exports.job = new CronJob(
  CRONTIME,
  sendAircraftPositions, // onTick
  null, // onComplete
  false, // start
  'utc' // timeZone
);
