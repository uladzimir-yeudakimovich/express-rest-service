const User = require('../../models/user.model');

const loginUser = async (login, password) => {
  const user = await User.findByCredentials(login, password);
  if (user === 403) return 403;
  const token = await user.generateAuthToken();
  return token;
};

module.exports = { loginUser };
