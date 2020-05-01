const router = require('express').Router();

const responseStatus = require('../../response/response-status');
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) return responseStatus(res, 'BAD_REQUEST');
    const token = await loginService.loginUser(login, password);
    if (token === 403 || !token) return responseStatus(res, 'FORBIDDEN');
    res.json({ message: 'Successful login.', token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
