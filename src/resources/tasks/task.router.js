const router = require('express').Router();
const { BAD_REQUEST } = require('http-status-codes');

const Task = require('./task.model');
const taskService = require('./task.service');
const { responseToClient } = require('../../helpers/errors-handling');

router.route('/').get(async (req, res) => {
  const boardId = req.baseUrl.split('/')[2];
  await responseToClient(taskService.getAll(boardId), req, res, Task);
});

router.route('/:id').get(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(taskService.getTask(req.params.id), req, res, Task);
});

router.route('/').post(async (req, res) => {
  const boardId = req.baseUrl.split('/')[2];
  if (!boardId || !req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(
    taskService.postTask(boardId, req.body),
    req,
    res,
    Task
  );
});

router.route('/:id').put(async (req, res) => {
  if (!req.params.id || !req.body) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(
    taskService.putTask(req.params.id, req.body),
    req,
    res,
    Task
  );
});

router.route('/:id').delete(async (req, res) => {
  if (!req.params.id) {
    res.status(BAD_REQUEST).send(BAD_REQUEST);
  }
  await responseToClient(taskService.deleteTask(req.params.id), req, res, Task);
});

module.exports = router;
