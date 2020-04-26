const router = require('express').Router({ mergeParams: true });

const Task = require('../../models/task.model');
const taskService = require('./task.service');
const responseStatus = require('../../response/response-status');
const responseToClient = require('../../response/response-to-client');

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
  const { title, description } = body;
  if (!title || !description) return responseStatus(res, 'BAD_REQUEST');
  await responseToClient(taskService.postTask(id, body), req, res, Task, next);
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { title, description } = body;
  if (!title || !description) return responseStatus(res, 'BAD_REQUEST');
  await responseToClient(taskService.putTask(id, body), req, res, Task, next);
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await responseToClient(taskService.deleteTask(id), req, res, Task, next);
});

module.exports = router;
