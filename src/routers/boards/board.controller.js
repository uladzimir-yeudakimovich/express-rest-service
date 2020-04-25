const Board = require('../../models/board.model');

const getAll = async () => Board.find({});

const getBoard = async id => Board.findById(id);

const addBoard = async board => Board.create(board);

const updateBoard = async (id, board) => {
  const boardForUpdate = Board.find({ _id: id });
  if (!(await boardForUpdate).length) return;
  await Board.findByIdAndUpdate(id, board);
  return Board.find({ _id: id });
};

const deleteBoard = async id => {
  const boardForDelete = Board.find({ _id: id });
  if (!(await boardForDelete).length) return;
  await Board.findByIdAndDelete(id);
  return 204;
};

module.exports = { getAll, getBoard, addBoard, updateBoard, deleteBoard };
