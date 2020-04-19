const Board = require('./board.model');

const getAll = async () => Board.find({});

const getBoard = async id => Board.findById(id);

const addBoard = async board => {
  if (!board.title || !board.columns) return 400;
  return Board.create(board);
};

const updateBoard = async (id, board) => {
  if (!board.title || !board.columns) return 400;
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
