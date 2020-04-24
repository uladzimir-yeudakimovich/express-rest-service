const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.login || !body.password) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  const token = await loginService.loginUser(body);
  if (token === 403 || !token) {
    res
      .status(HttpStatus.FORBIDDEN)
      .send('Incorrect login or password')
      .end();
  } else {
    res.json({
      status: HttpStatus.OK,
      message: 'Successful login',
      token
    });
  }
});

module.exports = router;
