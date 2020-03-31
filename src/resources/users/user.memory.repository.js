const allUsers = [
  {
    id: 1,
    name: 'Sasha',
    login: 'sasha',
    password: '123456'
  },
  {
    id: 2,
    name: 'Dasha',
    login: 'dasha',
    password: '135246'
  },
  {
    id: 3,
    name: 'Grisha',
    login: 'grisha',
    password: '162534'
  }
];

const getAll = async () => {
  return allUsers;
};

const getUser = async id => {
  const result = allUsers.filter(item => item.id === +id);
  return result;
};

module.exports = { getAll, getUser };
