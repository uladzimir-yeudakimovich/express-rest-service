const taskRepo = require('./task.memory.repository');

const getAll = () => taskRepo.getAll();

const getTask = id => taskRepo.getTask(id);

const postTask = (task, borderId) => taskRepo.postTask(task, borderId);

const putTask = (id, task) => taskRepo.putTask(id, task);

const deleteTask = id => taskRepo.deleteTask(id);

module.exports = { getAll, getTask, postTask, putTask, deleteTask };
