const uuid = require('uuid');

const { allTasks } = require('../tasks/task.memory.repository');
const Column = require('../columns/column.model');

const allBoards = [
  {
    id: '1',
    title: 'Project1',
    columns: [
      new Column(uuid(), 'to-do', '1'),
      new Column(uuid(), 'development', '2'),
      new Column(uuid(), 'test', '3'),
      new Column(uuid(), 'done', '4')
    ]
  },
  {
    id: '2',
    title: 'Project2',
    columns: [
      new Column(uuid(), 'to-do', '1'),
      new Column(uuid(), 'development', '2'),
      new Column(uuid(), 'test', '3'),
      new Column(uuid(), 'done', '4')
    ]
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
