const uuid = require('uuid');

const allTasks = [
  {
    id: '1',
    name: 'Create service',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '1',
    boardId: '1',
    columnId: '1'
  },
  {
    id: '2',
    name: 'Create service',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '2',
    boardId: '2',
    columnId: '1'
  },
  {
    id: '3',
    name: 'Create service',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '3',
    boardId: '3',
    columnId: '1'
  },
  {
    id: '4',
    name: 'Create service',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '1',
    boardId: '4',
    columnId: '1'
  }
];

const getAll = async () => {
  return allTasks;
};

const getTask = async id => {
  return allTasks.filter(item => item.id === id);
};

const postTask = async (boardId, task) => {
  task.id = uuid();
  task.boardId = boardId;
  allTasks.push(task);
  return task;
};

const putTask = async (boardId, id, task) => {
  return allTasks.filter((item, index) => {
    if (item.id === id) {
      task.boardId = boardId;
      allTasks[index] = task;
    }
  });
};

const deleteTask = async id => {
  return allTasks.filter((item, index) => {
    if (item.id === id) {
      allTasks.splice(index, 1);
    }
    return item;
  });
};

module.exports = { allTasks, getAll, getTask, postTask, putTask, deleteTask };
