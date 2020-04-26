const usersRepo = require('./user.controller');
const { deleteTasksFromUser } = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const editUser = (id, user) => usersRepo.updateUser(id, user);
const deleteUser = id => {
  deleteTasksFromUser(id);
  return usersRepo.deleteUser(id);
};

module.exports = { getAll, getUser, addUser, editUser, deleteUser };
