const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.login || !body.password) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  const auth = await loginService.loginUser(body, result => {
    if (result) {
      res
        .status(HttpStatus.OK)
        .send('Successful login')
        .end();
    } else {
      res
        .status(HttpStatus.FORBIDDEN)
        .send('Incorrect login or password')
        .end();
    }
  });
  if (auth === 403) {
    res
      .status(HttpStatus.FORBIDDEN)
      .send('Incorrect login or password')
      .end();
  }
});

module.exports = router;
