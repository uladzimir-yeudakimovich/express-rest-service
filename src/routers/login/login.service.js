const { sign } = require('jsonwebtoken');

const User = require('../../models/user.model');
const { JWT_SECRET_KEY } = require('../../common/config.js');

const loginUser = async (login, password) => {
  const user = await User.findByCredentials(login, password);
  if (user === 403) return 403;
  const { id } = user;
  return sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { loginUser };
