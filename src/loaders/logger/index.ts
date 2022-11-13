import { createLogger, format, transports } from 'winston';


import modules from '../../utils/modules';
export { modules };

const { combine, splat, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
  const { module = 'http' } = metadata;
  let msg = `${timestamp} [${level} - ${module}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(format.colorize(), splat(), timestamp(), customFormat), // sets combined error displaying format
  defaultMeta: { service: 'default' }, //add extra meta data to show where the the log comes from
  transports: [
    //Configures the transports, or essentially where do log messages go...
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }), //Error log files for error-level logs
    new transports.File({ filename: 'combined.log' }), //Simple file for everything together
  ],
});

//If we're not in production then log to the `console` with the format
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}

export default logger;
