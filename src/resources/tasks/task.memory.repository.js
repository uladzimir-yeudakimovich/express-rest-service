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

const postTask = async (task, boardId) => {
  task.id = (allTasks.length + 1).toString();
  task.boardId = boardId;
  allTasks.push(task);
  return task;
};

const putTask = async (id, task) => {
  const updateUser = allTasks.filter((item, index) => {
    if (item.id === id) {
      task.id = id;
      item = task;
      allTasks[index] = task;
    }
  });
  return updateUser;
};

const deleteTask = async id => {
  return allTasks.filter((item, index) => {
    if (item.id === id) {
      allTasks.splice(index, 1);
    } else {
      return item;
    }
  });
};

module.exports = { allTasks, getAll, getTask, postTask, putTask, deleteTask };
