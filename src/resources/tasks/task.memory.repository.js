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

const getAll = async () => {
  return allTasks;
};

const getTask = async id => {
  let user;
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === id) {
      user = allTasks[i];
    }
  }
  return [user];
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
      task.id = id;
      task.boardId = boardId;
      allTasks[index] = task;
      return task;
    }
  });
};

const deleteTask = async id => {
  const taskToDelete = allTasks.find(element => element.id === id);
  if (!taskToDelete) {
    return;
  }
  allTasks.filter((item, index) => {
    if (item.id === id) {
      allTasks.splice(index, 1);
    }
    return item;
  });
  return allTasks;
};

module.exports = { allTasks, getAll, getTask, postTask, putTask, deleteTask };
