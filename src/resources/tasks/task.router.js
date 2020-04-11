const router = require('express').Router();

const Task = require('./task.model');
const taskService = require('./task.service');
const { responseToClient } = require('../../helpers/errors-handling');

router.route('/').get(async (req, res) => {
  await responseToClient(
    taskService.getAll(req.baseUrl.split('/')[2]),
    req,
    res,
    Task
  );
});

router.route('/:id').get(async (req, res) => {
  await responseToClient(taskService.getTask(req.params.id), req, res, Task);
});

router.route('/').post(async (req, res) => {
  await responseToClient(
    taskService.postTask(req.baseUrl.split('/')[2], req.body),
    req,
    res,
    Task
  );
});

router.route('/:id').put(async (req, res) => {
  await responseToClient(
    taskService.putTask(req.params.id, req.body),
    req,
    res,
    Task
  );
});

router.route('/:id').delete(async (req, res) => {
  await responseToClient(taskService.deleteTask(req.params.id), req, res, Task);
});

module.exports = router;
