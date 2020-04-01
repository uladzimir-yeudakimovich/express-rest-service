const allTasks = [
  {
    id: '1',
    name: 'Create service',
    title: 'Service',
    order: '2',
    description: 'REST API Service',
    userId: '4',
    boardId: '3',
    columnId: '1'
  }
];

const getAll = async () => {
  return allTasks;
};

const getTask = async id => {
  return allTasks.filter(item => item.id === id);
};

const postTask = async task => {
  task.id = (allTasks.length + 1).toString();
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
    if (item.id !== id) {
      allTasks.slice(index);
      return item;
    }
  });
};

module.exports = { getAll, getTask, postTask, putTask, deleteTask };
