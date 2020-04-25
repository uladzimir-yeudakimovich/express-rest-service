const Task = require('../../models/task.model');

const getAll = async id => Task.find({ boardId: id });

const getTask = async id => Task.findById(id);

const addTask = async (boardId, task) => {
  task.boardId = boardId;
  return Task.create(task);
};

const updateTask = async (id, task) => {
  const taskForUpdate = Task.find({ _id: id });
  if (!(await taskForUpdate).length) return;
  await Task.findByIdAndUpdate(id, task);
  return Task.find({ _id: id });
};

const deleteTask = async id => {
  const taskForDelete = Task.find({ _id: id });
  if (!(await taskForDelete).length) return;
  await Task.findByIdAndDelete(id);
  return 204;
};

const deleteTasksFromUser = async id => {
  await Task.updateMany({ userId: id }, { userId: null });
};

const deleteTasksFromBoard = async id => {
  await Task.deleteMany({ boardId: id });
};

module.exports = {
  getAll,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  deleteTasksFromUser,
  deleteTasksFromBoard
};
