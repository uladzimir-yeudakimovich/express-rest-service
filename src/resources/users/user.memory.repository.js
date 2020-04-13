const User = require('./user.model');
const { allUsers } = require('../../db/db.client');

const getAll = async () => allUsers;

const getUser = async id => {
  const user = allUsers.find(element => element.id === id);
  if (!user) return 404;
  return user;
};

const postUser = async user => {
  const newUser = new User(user);
  allUsers.push(newUser);
  return newUser;
};

const putUser = async (id, user) => {
  const index = allUsers.findIndex(element => element.id === id);
  if (index < 0) return 404;
  user.id = id;
  allUsers[index] = user;
  return allUsers.find(element => element.id === id);
};

const deleteUser = async id => {
  const userToDelete = allUsers.find(element => element.id === id);
  if (!userToDelete) return 404;
  const index = allUsers.findIndex(element => element.id === id);
  allUsers.splice(index, 1);
  return 204;
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
