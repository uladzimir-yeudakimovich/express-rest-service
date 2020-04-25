const router = require('express').Router();
const responseStatus = require('../../response/response-status');

const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.login || !body.password) return responseStatus(res, 'BAD_REQUEST');
  const token = await loginService.loginUser(body);
  if (token === 403 || !token) return responseStatus(res, 'FORBIDDEN');
  res.json({ message: 'Successful login.', token });
});

module.exports = router;
