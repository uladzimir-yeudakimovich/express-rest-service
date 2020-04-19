const HttpStatus = require('http-status-codes');

const logger = require('./logger');

const errorHandler = async (err, req, res, next) => {
  logger.error(err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something broke!');
  next();
};

module.exports = errorHandler;
