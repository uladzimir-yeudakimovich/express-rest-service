const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const getTask = id => taskRepo.getTask(id);

const postTask = (boardId, task) => taskRepo.postTask(boardId, task);

const putTask = (boardId, id, task) => taskRepo.putTask(boardId, id, task);

const deleteTask = id => taskRepo.deleteTask(id);

module.exports = { getAll, getTask, postTask, putTask, deleteTask };
