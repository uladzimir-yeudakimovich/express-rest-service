const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'logs/exceptions.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' }),
        format.uncolorize(),
        format.prettyPrint()
      )
    })
  ]
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
  logger.error(err.stack);
  next(err);
};

module.exports = { logger, logRequest, logErrors };
