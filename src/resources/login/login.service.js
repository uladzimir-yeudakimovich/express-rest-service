const User = require('../users/user.model');

const loginUser = async (data, callback) => {
  const findUser = User.find({ login: data.login });
  if (!(await findUser).length) return 403;
  User.findOne({ login: data.login }, (error, user) => {
    if (error) throw error;
    user.validatePassword(data.password, result => {
      callback(result);
    });
  });
};

module.exports = { loginUser };
