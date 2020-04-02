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
  let board;
  for (let i = 0; i < allBoards.length; i++) {
    if (allBoards[i].id === id) {
      board = allBoards[i];
    }
  }
  return [board];
};

const postBoard = async board => {
  board.id = uuid();
  allBoards.push(board);
  return board;
};

const putBoard = async (id, board) => {
  return allBoards.filter((item, index) => {
    if (item.id === id) {
      board.id = id;
      allBoards[index] = board;
      return board;
    }
  });
};

const deleteBoard = async id => {
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
  allTasks.filter((item, index) => {
    if (item.boardId === id) {
      allTasks.splice(index, 1);
    }
    return item;
  });
  return allTasks;
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
