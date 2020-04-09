const router = require('express').Router();
const { BAD_REQUEST } = require('http-status-codes');

const Task = require('./task.model');
const taskService = require('./task.service');
const { responseToClient } = require('../../helpers/error-hendling');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.baseUrl.split('/')[2]);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(taskService.getTask(req.params.id), res, Task);
});

router.route('/').post(async (req, res) => {
  const boardId = req.baseUrl.split('/')[2];
  if (!boardId || !req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(taskService.postTask(boardId, req.body), res, Task);
});

router.route('/:id').put(async (req, res) => {
  if (!req.params.id || !req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(
    taskService.putTask(req.params.id, req.body),
    res,
    Task
  );
});

router.route('/:id').delete(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(taskService.deleteTask(req.params.id), res, Task);
});

module.exports = router;
