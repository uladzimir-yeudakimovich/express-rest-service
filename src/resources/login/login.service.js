const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../common/config.js');
const User = require('../users/user.model');

const loginUser = async (data, callback) => {
  const findUser = User.find({ login: data.login });
  if (!(await findUser).length) return 403;
  User.findOne({ login: data.login }, (error, user) => {
    if (error) throw error;
    const { id, login } = user;
    user.validatePassword(data.password, result => {
      let token;
      if (result) {
        console.log(id, login);
        token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '1h' });
      }
      callback(result, token);
    });
  });
};

module.exports = { loginUser };
