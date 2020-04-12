const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
  getStatusText
} = require('http-status-codes');

const logger = require('./logger');

class Error {
  constructor(status) {
    this.status = status;
    this.text = getStatusText(this.status);
  }
}

const responseToClient = async (promiss, req, res, model, next) => {
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
      } else if (response === 204) {
        return res.status(NO_CONTENT).end();
      }

      if (Array.isArray(response)) {
        res.json(response.map(model.toResponse));
      } else {
        res.json(model.toResponse(response));
      }

      next();
    })
    .catch(err => {
      if (!err.status) err = new Error(INTERNAL_SERVER_ERROR);
      logger.error('error', err);
      res.status(err.status).send(err.text);
      next(err);
    });
};

module.exports = responseToClient;
