const Task = require('./task.model');

const getAll = id => Task.find({ boardId: id });

const getTask = id => Task.findById(id);

const addTask = (boardId, task) => {
  if (!task.title || !task.description) return 400;
  task.boardId = boardId;
  return Task.create(task);
};

const updateTask = async (id, task) => {
  if (!task.title || !task.description) return 400;
  const taskForUpdate = Task.find({ _id: id });
  if (!(await taskForUpdate).length) return 404;
  await Task.findByIdAndUpdate(id, task);
  return Task.find({ _id: id });
};

const deleteTask = async id => {
  const taskForDelete = Task.find({ _id: id });
  if (!(await taskForDelete).length) return 404;
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
