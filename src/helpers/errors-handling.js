const {
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');

const logger = require('./logger');
const Error = require('./error');

const responseToClient = async (promiss, req, res, model, next) => {
  const { originalUrl, method, params, body } = req;
  const message = JSON.stringify({ url: originalUrl, method, params, body });
  logger.log('info', message);

  promiss
    .then(response => {
      let err;
      switch (response) {
        case 204:
          return res.status(NO_CONTENT).end();
        case 400:
          err = new Error(BAD_REQUEST);
          throw err;
        case 404:
          err = new Error(NOT_FOUND);
          throw err;
        default:
          if (Array.isArray(response)) {
            res.json(response.map(model.toResponse));
          } else {
            res.json(model.toResponse(response));
          }
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
