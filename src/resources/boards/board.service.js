const boardRepo = require('./board.memory.repository');

const { deleteTasksFromBoard } = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();

const getBoard = id => boardRepo.getBoard(id);

const postBoard = board => boardRepo.postBoard(board);

const putBoard = (id, board) => boardRepo.putBoard(id, board);

const deleteBoard = id => {
  deleteTasksFromBoard(id);
  return boardRepo.deleteBoard(id);
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
