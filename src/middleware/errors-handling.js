const HttpStatus = require('http-status-codes');

const clientErrorHandler = async (err, req, res, next) => {
  if (req.xhr) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: 'Something failed!' });
  }
  next(err);
};

const errorHandler = async (err, req, res, next) => {
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something broke!');
  next(err);
};

module.exports = { clientErrorHandler, errorHandler };
