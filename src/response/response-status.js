const HttpStatus = require('http-status-codes');

const { logger } = require('../middleware/logger');

const responseStatus = async (res, code, name) => {
  const text = {
    CONFLICT: 'A user with this login already exists. Use a different login.',
    FORBIDDEN: 'Incorrect login or password',
    NO_CONTENT: `The ${name} has been deleted`
  };
  const statusCode = await HttpStatus[code];
  const statusText = await (text[code] || HttpStatus.getStatusText(statusCode));
  res.status(statusCode).send(statusText);
  logger.info(`status: ${statusCode}, text: ${statusText}`);
};

module.exports = responseStatus;
