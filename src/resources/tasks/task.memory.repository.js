const uuid = require('uuid');

const allTasks = [
  {
    id: '1',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '1',
    boardId: '1',
    columnId: '1'
  },
  {
    id: '2',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '2',
    boardId: '2',
    columnId: '1'
  },
  {
    id: '3',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '3',
    boardId: '3',
    columnId: '1'
  },
  {
    id: '4',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '1',
    boardId: '4',
    columnId: '1'
  }
];

const getAll = async boardId => {
  return allTasks.filter(item => item.boardId === boardId);
};

const getTask = async id => {
  const task = allTasks.find(element => element.id === id);
  if (!task) {
    return;
  }
  return task;
};

const postTask = async (boardId, task) => {
  if (!task.title || !task.description) {
    return;
  }
  task.id = uuid();
  task.boardId = boardId;
  allTasks.push(task);
  return task;
};

const putTask = async (id, task) => {
  if (!task.title || !task.description) {
    return;
  }
  const index = allTasks.findIndex(element => element.id === id);
  allTasks[index] = task;
  return allTasks.find(element => element.id === id);
};

const deleteTask = async id => {
  const taskToDelete = allTasks.find(element => element.id === id);
  if (!taskToDelete) {
    return;
  }
  const index = allTasks.findIndex(element => element.id === id);
  allTasks.splice(index, 1);
  return allTasks;
};

const deleteTasksFromUser = async id => {
  allTasks.forEach(item => {
    if (item.userId === id) {
      item.userId = null;
    }
  });
};

const deleteTasksFromBoard = async id => {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].boardId === id) {
      allTasks.splice(i, 1);
      i--;
    }
  }
};

module.exports = {
  getAll,
  getTask,
  postTask,
  putTask,
  deleteTask,
  deleteTasksFromUser,
  deleteTasksFromBoard
};
