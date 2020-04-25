const HttpStatus = require('http-status-codes');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    if (err.status) return res.status(err.status).send(err.message);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorHandler;
