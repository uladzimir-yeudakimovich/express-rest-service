const Task = require('./task.model');
const allTasks = require('../../db/tasks');

const getAll = async id => allTasks.filter(item => item.boardId === id);

const getTask = async id => {
  const task = allTasks.find(element => element.id === id);
  if (!task) return 404;
  return task;
};

const postTask = async (boardId, task) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  allTasks.push(newTask);
  return newTask;
};

const putTask = async (id, task) => {
  const index = allTasks.findIndex(element => element.id === id);
  if (index < 0) return 404;
  task.id = id;
  allTasks[index] = task;
  return allTasks.find(element => element.id === id);
};

const deleteTask = async id => {
  const taskToDelete = allTasks.find(element => element.id === id);
  if (!taskToDelete) return 404;
  const index = allTasks.findIndex(element => element.id === id);
  allTasks.splice(index, 1);
  return 204;
};

const deleteTasksFromUser = async id => {
  allTasks.forEach(item => {
    if (item.userId === id) item.userId = null;
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
