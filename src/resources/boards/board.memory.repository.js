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
  allBoards.filter((item, index) => {
    if (item.id === id) {
      board.id = id;
      allBoards[index] = board;
    }
  });
  return allBoards.find(element => element.id === id);
};

const deleteBoard = async id => {
  deleteTasks(id);
  const boardToDelete = allBoards.find(element => element.id === id);
  if (!boardToDelete) {
    return;
  }
  allBoards.filter((item, index) => {
    if (item.id === id) {
      allBoards.splice(index, 1);
    }
    return item;
  });
  return allBoards;
};

const deleteTasks = async id => {
  const taskToDelete = allTasks.find(element => element.id === id);
  if (!taskToDelete) {
    return;
  }
  allTasks.filter((item, index) => {
    if (item.boardId === id) {
      allTasks.splice(index, 1);
    }
    return item;
  });
  return allTasks;
};

module.exports = { getAll, getBoard, postBoard, putBoard, deleteBoard };
