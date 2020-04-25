const responseStatus = require('../response/response-status');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    if (err.status) return res.status(err.status).send(err.message);
    return responseStatus(res, 'INTERNAL_SERVER_ERROR');
  }
  next();
};

module.exports = errorHandler;
