const { createLogger, format, transports } = require('winston');
const path = require('path');

const myFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
  format.uncolorize(),
  format.prettyPrint()
);

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'error.log'),
      level: 'error',
      format: myFormat
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'info.log'),
      level: 'info',
      format: myFormat
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'exceptions.log'),
      level: 'error',
      format: myFormat
    })
  ],
  exitOnError: true
});

const logRequest = async (req, res, next) => {
  const { url, method, params, body } = req;
  logger.info(
    `url: ${url}, method: ${method}, params: ${JSON.stringify(
      params
    )}, body: ${JSON.stringify(body)}`
  );
  next();
};

const logErrors = async (err, req, res, next) => {
  if (err) logger.error(err.stack);
  next();
};

module.exports = { logger, logRequest, logErrors };
