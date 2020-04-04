const uuid = require('uuid');
const { allTasks } = require('../tasks/task.memory.repository');

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
  return allBoards.find(element => element.id === id);
};

const postBoard = async board => {
  if (!board.title || !board.columns.length) {
    return;
  }
  board.id = uuid();
  allBoards.push(board);
  return board;
};

const putBoard = async (id, board) => {
  if (!board.title || !board.columns.length) {
    return;
  }
  allBoards.filter((item, index) => {
    if (item.id === id) {
      board.id = id;
      allBoards[index] = board;
    }
  });
  return allBoards.find(element => element.id === id);
};

const deleteBoard = async id => {
  const boardToDelete = allBoards.find(element => element.id === id);
  if (!boardToDelete) {
    return;
  }
  deleteTasks(id);
  allBoards.filter((item, index) => {
    if (item.id === id) {
      allBoards.splice(index, 1);
    }
    return item;
  });
  return allBoards;
};

const deleteTasks = async id => {
  allTasks.forEach(item => {
    if (item.boardId === id) {
      item.id = '';
      item.userId = '';
      item.boardId = '';
      item.title = '';
      item.description = '';
    }
  });
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
