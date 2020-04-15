const User = require('./user.model');

const getAll = () => User.find({});

const getUser = id => User.findById(id);

const addUser = user => {
  if (!user.login || !user.password) return 400;
  return User.create(user);
};

const updateUser = async (id, user) => {
  if (!user.login || !user.password) return 400;
  const userForUpdate = User.find({ _id: id });
  if (!(await userForUpdate).length) return 404;
  await User.findByIdAndUpdate(id, user);
  return User.find({ _id: id });
};

const deleteUser = async id => {
  const userForDelete = User.find({ _id: id });
  if (!(await userForDelete).length) return 404;
  await User.findByIdAndDelete(id);
  return 204;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
