const uuid = require('uuid');

const { allTasks } = require('../tasks/task.memory.repository');

const allBoards = [
  {
    id: '1',
    title: 'Project1',
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
  },
  {
    id: '2',
    title: 'Project2',
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
  }
];

const getAll = async () => {
  return allBoards;
};

const getBoard = async id => {
  const board = allBoards.find(element => element.id === id);
  if (!board) {
    return;
  }
  return board;
};

const postBoard = async board => {
  if (!board.title || !board.columns) {
    return;
  }
  board.id = uuid();
  allBoards.push(board);
  return board;
};

const putBoard = async (id, board) => {
  if (!board.title || !board.columns) {
    return;
  }
  const index = allBoards.findIndex(element => element.id === id);
  allBoards[index] = board;
  return allBoards[index];
};

const deleteBoard = async id => {
  const boardToDelete = allBoards.find(element => element.id === id);
  if (!boardToDelete) {
    return;
  }
  deleteTasks(id);
  const index = allBoards.findIndex(element => element.id === id);
  allBoards.splice(index, 1);
  return allBoards;
};

const deleteTasks = async id => {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].boardId === id) {
      allTasks.splice(i, 1);
      i--;
    }
  }
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
