const usersRepo = require('./user.memory.repository');

const { deleteTasksFromUser } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const postUser = user => {
  if (!user.login || !user.password) return 400;
  return usersRepo.addUser(user);
};

const putUser = (id, user) => {
  if (!user.login || !user.password) return 400;
  return usersRepo.updateUser(id, user);
};

const deleteUser = id => {
  deleteTasksFromUser(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
