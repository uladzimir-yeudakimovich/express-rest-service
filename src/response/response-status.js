const HttpStatus = require('http-status-codes');

const { logger } = require('../middleware/logger');

const responseStatus = (res, code) => {
  const text = {
    CONFLICT: 'A user with this login already exists. Use a different login.',
    FORBIDDEN: 'Incorrect login or password',
    NO_CONTENT: 'Has been deleted'
  };
  const statusCode = HttpStatus[code];
  const statusText = text[code] || HttpStatus.getStatusText(statusCode);
  res.status(statusCode).send(statusText);
  logger.info(`status: ${statusCode}, text: ${statusText}`);
};

module.exports = responseStatus;
