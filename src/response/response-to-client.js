const responseStatus = require('./response-status');

const responseToClient = async (promiss, req, res, model, next) => {
  promiss
    .then(response => {
      switch (response) {
        case 204:
          return responseStatus(res, 'NO_CONTENT');
        case null:
          return responseStatus(res, 'NOT_FOUND');
        case 409:
          return responseStatus(res, 'CONFLICT');
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
