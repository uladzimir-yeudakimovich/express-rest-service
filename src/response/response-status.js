const HttpStatus = require('http-status-codes');

const { logger } = require('../middleware/logger');

const responseStatus = (res, code) => {
  const text = {
    CONFLICT: 'A user with this login already exists. Use a different login.',
    FORBIDDEN: 'Incorrect login or password',
    NO_CONTENT: 'Has been deleted'
  };
  if (text[code]) {
    res.status(HttpStatus[code]).send(text[code]);
  } else {
    res
      .status(HttpStatus[code])
      .send(HttpStatus.getStatusText(HttpStatus[code]));
  }
  logger.info(`status: ${HttpStatus[code]}, text: ${text[code] || code}`);
};

module.exports = responseStatus;
