const User = require('./user.model');

const getAll = async () => User.find({});

const getUser = async id => User.findById(id);

const addUser = async user => User.create(user);

const updateUser = async (id, user) => {
  const userForUpdate = User.find({ _id: id });
  if (!(await userForUpdate).length) return 404;
  user._id = id;
  await User.findByIdAndUpdate(id, user);
  return User.find({ _id: id });
};

const deleteUser = async id => {
  const userToDelete = User.find({ _id: id });
  if (!(await userToDelete).length) return 404;
  await User.findByIdAndRemove(id);
  return 204;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
