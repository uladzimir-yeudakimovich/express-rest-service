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
  user.id = (allUsers.length + 1).toString();
  allUsers.push(user);
  return user;
};

const putUser = async (id, user) => {
  const updateUser = allUsers.filter((item, index) => {
    if (item.id === id) {
      user.id = id;
      item = user;
      allUsers[index] = user;
    }
  });
  return updateUser;
};

const deleteUser = async id => {
  allTasks.filter(item => {
    if (item.userId === id) {
      item.userId = null;
    }
    return item;
  });
  return allUsers.filter((item, index) => {
    if (item.id === id) {
      allUsers.splice(index, 1);
    } else {
      return item;
    }
  });
};

module.exports = { getAll, getUser, postUser, putUser, deleteUser };
