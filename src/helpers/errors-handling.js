const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');

const { logger } = require('./logger');

class Error {
  constructor(status) {
    this.status = status;
    this.text = getStatusText(this.status);
  }
}

const responseToClient = async (promiss, req, res, model) => {
  const { originalUrl, method, params, body } = req;
  const message = JSON.stringify({ url: originalUrl, method, params, body });
  logger.log('info', message);

  promiss
    .then(response => {
      if (response === 404) {
        const err = new Error(NOT_FOUND);
        throw err;
      } else if (response === 400) {
        const err = new Error(BAD_REQUEST);
        throw err;
      }
      if (Array.isArray(response)) {
        res.json(response.map(model.toResponse));
      } else {
        res.json(model.toResponse(response));
      }
    })
    .catch(err => {
      logger.error('error', err);
      if (!err.status) {
        err = new Error(INTERNAL_SERVER_ERROR);
      }
      res.status(err.status).send(err.text);
    });
};

module.exports = { responseToClient };
