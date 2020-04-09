const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

class Error {
  constructor(status) {
    this.status = status;
    this.text = getStatusText(this.status);
  }
}

const responseToClient = async (method, res, validReq) => {
  method
    .then(response => {
      if (!response) {
        const err = new Error(NOT_FOUND);
        throw err;
      }
      if (Array.isArray(response)) {
        res.json(response.map(validReq.toResponse));
      } else {
        res.json(validReq.toResponse(response));
      }
    })
    .catch(err => {
      if (!err.status) {
        err = new Error(INTERNAL_SERVER_ERROR);
      }
      res.status(err.status).send(err.text);
    });
};

module.exports = { responseToClient };
