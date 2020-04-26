const taskRepo = require('./task.controller');

const getAll = boardId => taskRepo.getAll(boardId);
const getTask = id => taskRepo.getTask(id);
const addTask = (boardId, task) => taskRepo.addTask(boardId, task);
const editTask = (id, task) => taskRepo.updateTask(id, task);
const deleteTask = id => taskRepo.deleteTask(id);
const deleteTasksFromUser = id => taskRepo.deleteTasksFromUser(id);
const deleteTasksFromBoard = id => taskRepo.deleteTasksFromBoard(id);

module.exports = {
  getAll,
  getTask,
  addTask,
  editTask,
  deleteTask,
  deleteTasksFromUser,
  deleteTasksFromBoard
};
