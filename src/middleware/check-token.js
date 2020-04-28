const { verify } = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config.js');
const responseStatus = require('../response/response-status');
const usersService = require('../routers/users/user.service');

const checkToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return responseStatus(res, 'UNAUTHORIZED');
  if (token.startsWith('Bearer ')) token = await token.slice(7, token.length);
  verify(token, JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return responseStatus(res, 'UNAUTHORIZED');
    const user = await usersService.getUser(decoded.id);
    if (user.login !== decoded.login) {
      return responseStatus(res, 'UNAUTHORIZED');
    }
    next();
  });
};

module.exports = checkToken;
