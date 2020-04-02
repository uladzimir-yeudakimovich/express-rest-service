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
  let user;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === id) {
      user = allUsers[i];
    }
  }
  return [user];
};

const postUser = async user => {
  user.id = uuid();
  allUsers.push(user);
  return user;
};

const putUser = async (id, user) => {
  return allUsers.filter((item, index) => {
    if (item.id === id) {
      user.id = id;
      allUsers[index] = user;
      return user;
    }
  });
};

const deleteUser = async id => {
  updateTasks(id);
  allUsers.filter((item, index) => {
    if (item.id === id) {
      allUsers.splice(index, 1);
    }
    return item;
  });
  return allUsers;
};

const updateTasks = async id => {
  allTasks.filter(item => {
    if (item.userId === id) {
      item.userId = null;
    }
    return item;
  });
  return allTasks;
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
