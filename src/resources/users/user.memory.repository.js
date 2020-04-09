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
    return;
  }
  return user;
};

const postUser = async user => {
  if (!user.login || !user.password) {
    return;
  }
  user.id = uuid();
  allUsers.push(user);
  return user;
};

const putUser = async (id, user) => {
  if (!user.login || !user.password) {
    return;
  }
  const index = allUsers.findIndex(element => element.id === id);
  allUsers[index] = user;
  return allUsers.find(element => element.id === id);
};

const deleteUser = async id => {
  const userToDelete = allUsers.find(element => element.id === id);
  if (!userToDelete) {
    return;
  }
  const index = allUsers.findIndex(element => element.id === id);
  allUsers.splice(index, 1);
  return allUsers;
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
