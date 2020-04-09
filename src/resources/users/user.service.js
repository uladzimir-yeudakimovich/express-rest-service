const usersRepo = require('./user.memory.repository');

const { deleteTasksFromUser } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const postUser = user => usersRepo.postUser(user);

const putUser = (id, user) => usersRepo.putUser(id, user);

const deleteUser = id => {
  deleteTasksFromUser(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
