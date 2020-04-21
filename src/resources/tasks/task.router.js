const router = require('express').Router({ mergeParams: true });
const HttpStatus = require('http-status-codes');

const Task = require('./task.model');
const taskService = require('./task.service');
const responseToClient = require('../../helpers/response-to-client');

router.route('/').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(taskService.getAll(id), req, res, Task, next);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(taskService.getTask(id), req, res, Task, next);
});

router.route('/').post(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (!body.title || !body.description) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  await responseToClient(taskService.postTask(id, body), req, res, Task, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  if (!body.title || !body.description) {
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
  await responseToClient(taskService.putTask(id, body), req, res, Task, next);
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(taskService.deleteTask(id), req, res, Task, next);
});

module.exports = router;
