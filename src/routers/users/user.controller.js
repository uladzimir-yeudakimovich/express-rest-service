const User = require('../../models/user.model');

const getAll = async () => User.find({});

const getUser = async id => User.findById(id);

const addUser = async user => {
  const userForSave = User.find({ login: user.login });
  if ((await userForSave).length) return 409;
  return User.create(user);
};

const updateUser = async (id, user) => {
  const findUserById = User.find({ _id: id });
  if (!(await findUserById).length) return;
  const findUserByIdAndLogin = User.find({ _id: id, login: user.login });
  const findUserByLogin = User.find({ login: user.login });
  if (!(await findUserByIdAndLogin).length && (await findUserByLogin).length) {
    return 409;
  }
  await User.findByIdAndUpdate(id, user);
  return User.find({ _id: id });
};

const deleteUser = async id => {
  const userForDelete = User.find({ _id: id });
  if (!(await userForDelete).length) return;
  await User.findByIdAndDelete(id);
  return 204;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
