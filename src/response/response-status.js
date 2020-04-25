const HttpStatus = require('http-status-codes');

const responseStatus = (res, code) => {
  let text;
  if (code === 'CONFLICT') {
    text = 'A user with this login already exists. Use a different login.';
  } else if (code === 'FORBIDDEN') {
    text = 'Incorrect login or password';
  } else {
    text = code;
  }
  return res
    .status(HttpStatus[code])
    .send(HttpStatus.getStatusText(HttpStatus[text]));
};

module.exports = responseStatus;
