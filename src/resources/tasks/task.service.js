const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const getTask = id => taskRepo.getTask(id);

const postTask = (boardId, task) => {
  if (!task.title || !task.description) return 400;
  return taskRepo.postTask(boardId, task);
};

const putTask = (id, task) => {
  if (!task.title || !task.description) return 400;
  return taskRepo.putTask(id, task);
};

const deleteTask = id => taskRepo.deleteTask(id);

const deleteTasksFromUser = id => taskRepo.deleteTasksFromUser(id);

const deleteTasksFromBoard = id => taskRepo.deleteTasksFromBoard(id);

module.exports = {
  getAll,
  getTask,
  postTask,
  putTask,
  deleteTask,
  deleteTasksFromUser,
  deleteTasksFromBoard
};
