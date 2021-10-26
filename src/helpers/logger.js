import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logsPath = path.resolve(__dirname, '../', 'logs');

if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}

const logger = new winston.Logger({
  transports : [
    // Add AWS CloudWatch
    new winston.transports.Console({
      handleExceptions : true,
      timestamp        : true,
      json             : true,
      colorize         : true,
      prettyPrint      : true,
    }),
    new winston.transports.File({
      handleExceptions : true,
      maxsize          : 5242880,
      maxFiles         : 5,
      filename         : `${logsPath}/application.log`,
    }),
  ],
});

export default logger;
