const HttpStatus = require('http-status-codes');

const responseToClient = async (promiss, req, res, model, next) => {
  promiss
    .then(response => {
      switch (response) {
        case 204:
          return res.status(HttpStatus.NO_CONTENT).end();
        case 400:
          return res.status(HttpStatus.BAD_REQUEST).end();
        case null:
          return res.status(HttpStatus.NOT_FOUND).end();
        default:
          if (Array.isArray(response)) {
            res.json(response.map(model.toResponse));
          } else {
            res.json(model.toResponse(response));
          }
      }
    })
    .catch(next);
};

module.exports = responseToClient;
