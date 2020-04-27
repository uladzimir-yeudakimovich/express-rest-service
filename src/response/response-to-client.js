const responseStatus = require('./response-status');

const responseToClient = async (promiss, req, res, model, next) => {
  promiss
    .then(response => {
      if (!response) return responseStatus(res, 'NOT_FOUND');
      if (response === 204) {
        const deleteName = req.baseUrl
          .split('/')
          .slice(-1)[0]
          .slice(0, -1);
        return responseStatus(res, 'NO_CONTENT', deleteName);
      }
      if (response === 409) return responseStatus(res, 'CONFLICT');
      if (Array.isArray(response)) {
        res.json(response.map(model.toResponse));
      } else {
        res.json(model.toResponse(response));
      }
    })
    .catch(next);
};

module.exports = responseToClient;
