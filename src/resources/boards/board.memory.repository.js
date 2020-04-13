const Board = require('./board.model');
const { allBoards } = require('../../db/db.client');

const getAll = async () => allBoards;

const getBoard = async id => {
  const board = allBoards.find(element => element.id === id);
  if (!board) return 404;
  return board;
};

const postBoard = async board => {
  const newBoard = new Board(board);
  allBoards.push(newBoard);
  return newBoard;
};

const putBoard = async (id, board) => {
  const index = allBoards.findIndex(element => element.id === id);
  if (index < 0) return 404;
  board.id = id;
  allBoards[index] = board;
  return allBoards[index];
};

const deleteBoard = async id => {
  const boardToDelete = allBoards.find(element => element.id === id);
  if (!boardToDelete) return 404;
  const index = allBoards.findIndex(element => element.id === id);
  allBoards.splice(index, 1);
  return 204;
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
