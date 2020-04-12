const { getStatusText } = require('http-status-codes');

class Error {
  constructor(status) {
    this.status = status;
    this.text = getStatusText(this.status);
  }
}

module.exports = Error;
