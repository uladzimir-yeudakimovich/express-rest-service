const HttpStatus = require('http-status-codes');

const { logger } = require('../middleware/logger');

const responseStatus = (res, code) => {
  let text;
  if (code === 'CONFLICT') {
    text = 'A user with this login already exists. Use a different login.';
  } else if (code === 'FORBIDDEN') {
    text = 'Incorrect login or password';
  } else if (code === 'NO_CONTENT') {
    text = 'Has been deleted';
  } else {
    text = code;
  }
  if (text === code) {
    res
      .status(HttpStatus[code])
      .send(HttpStatus.getStatusText(HttpStatus[code]));
  } else {
    res.status(HttpStatus[code]).send(text);
  }
  logger.info(`status: ${HttpStatus[code]}, text: ${text}`);
};

module.exports = responseStatus;
