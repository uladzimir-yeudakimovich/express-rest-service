const uuid = require('uuid');

const allUsers = [
  {
    id: '1',
    name: 'Sasha',
    login: 'sasha',
    password: '123456'
  },
  {
    id: '2',
    name: 'Dasha',
    login: 'dasha',
    password: '135246'
  },
  {
    id: '3',
    name: 'Grisha',
    login: 'grisha',
    password: '162534'
  }
];

const getAll = async () => {
  return allUsers;
};

const getUser = async id => {
  const user = allUsers.find(element => element.id === id);
  if (!user) {
    return 404;
  }
  return user;
};

const postUser = async user => {
  if (!user.login || !user.password) {
    return 400;
  }
  user.id = uuid();
  allUsers.push(user);
  return user;
};

const putUser = async (id, user) => {
  if (!user.login || !user.password) {
    return 400;
  }
  const index = allUsers.findIndex(element => element.id === id);
  if (index < 0) {
    return 404;
  }
  user.id = id;
  allUsers[index] = user;
  return allUsers.find(element => element.id === id);
};

const deleteUser = async id => {
  const userToDelete = allUsers.find(element => element.id === id);
  if (!userToDelete) {
    return 404;
  }
  const index = allUsers.findIndex(element => element.id === id);
  allUsers.splice(index, 1);
  return 204;
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
