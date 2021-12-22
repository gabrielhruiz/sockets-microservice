const winston = require('winston');
require('winston-daily-rotate-file');

const logConfig = {
  levels: {
    error: 0,
    warning: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    debug: 'green'
  }
};

winston.addColors(logConfig.colors);

const logger = winston.createLogger({
  levels: logConfig.levels,
  timestamp: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      handleExceptions: true,
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'logs/info-%DATE%.log',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  exitOnError: false
});

module.exports = { logger };
