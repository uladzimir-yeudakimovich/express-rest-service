// const allTasks = require('../tasks/task.memory.repository');

const allBoards = [
  {
    id: '1',
    title: 'Project1',
    columns: [
      {
        id: '1',
        title: 'to-do',
        order: '1'
      },
      {
        id: '2',
        title: 'development',
        order: '2'
      },
      {
        id: '3',
        title: 'test',
        order: '3'
      },
      {
        id: '4',
        title: 'done',
        order: '4'
      }
    ]
  },
  {
    id: '2',
    title: 'Project2',
    columns: [
      {
        id: '1',
        title: 'to-do',
        order: '1'
      },
      {
        id: '2',
        title: 'development',
        order: '2'
      },
      {
        id: '3',
        title: 'test',
        order: '3'
      },
      {
        id: '4',
        title: 'done',
        order: '4'
      }
    ]
  }
];

const getAll = async () => {
  return allBoards;
};

const getBoard = async id => {
  return allBoards.filter(item => item.id === id);
};

const postBoard = async board => {
  board.id = (allBoards.length + 1).toString();
  allBoards.push(board);
  return board;
};

const putBoard = async (id, board) => {
  const updateUser = allBoards.filter((item, index) => {
    if (item.id === id) {
      board.id = id;
      item = board;
      allBoards[index] = board;
    }
  });
  return updateUser;
};

const deleteBoard = async id => {
  // allTasks.filter((item, index) => {
  //   if (item.id === id) {
  //     allTasks.splice(index, 1);
  //   } else {
  //     return item;
  //   }
  // });
  return allBoards.filter((item, index) => {
    if (item.id === id) {
      allBoards.splice(index, 1);
    } else {
      return item;
    }
  });
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
