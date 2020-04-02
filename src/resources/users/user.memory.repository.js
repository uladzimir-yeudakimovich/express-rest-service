const uuid = require('uuid');
const { allTasks } = require('../tasks/task.memory.repository');

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
  return allUsers.filter(item => item.id === id);
};

const postUser = async user => {
  user.id = uuid();
  allUsers.push(user);
  return user;
};

const putUser = async (id, user) => {
  return allUsers.filter((item, index) => {
    if (item.id === id) {
      allUsers[index] = user;
    }
  });
};

const deleteUser = async id => {
  updateTasks(id);
  return allUsers.filter((item, index) => {
    if (item.id === id) {
      allUsers.splice(index, 1);
    } else {
      return item;
    }
  });
};

const updateTasks = async id => {
  return allTasks.filter(item => {
    if (item.userId === id) {
      item.userId = null;
    }
    return item;
  });
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
