const uuid = require('uuid');

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
  const board = allBoards.find(element => element.id === id);
  if (!board) {
    return 404;
  }
  console.log(board);
  return board;
};

const postBoard = async board => {
  if (!board.title || !board.columns) {
    return 400;
  }
  board.id = uuid();
  allBoards.push(board);
  return board;
};

const putBoard = async (id, board) => {
  if (!board.title || !board.columns) {
    return 400;
  }
  const index = allBoards.findIndex(element => element.id === id);
  if (index < 0) {
    return 404;
  }
  board.id = id;
  allBoards[index] = board;
  return allBoards[index];
};

const deleteBoard = async id => {
  const boardToDelete = allBoards.find(element => element.id === id);
  if (!boardToDelete) {
    return 404;
  }
  const index = allBoards.findIndex(element => element.id === id);
  allBoards.splice(index, 1);
  return allBoards;
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
