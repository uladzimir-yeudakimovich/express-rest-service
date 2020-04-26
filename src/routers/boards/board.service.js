const boardRepo = require('./board.controller');
const { deleteTasksFromBoard } = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();
const getBoard = id => boardRepo.getBoard(id);
const addBoard = board => boardRepo.addBoard(board);
const editBoard = (id, board) => boardRepo.updateBoard(id, board);
const deleteBoard = id => {
  deleteTasksFromBoard(id);
  return boardRepo.deleteBoard(id);
};

module.exports = { getAll, getBoard, addBoard, editBoard, deleteBoard };
