const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.getTask(req.params.id);
  res.json(task.map(Task.toResponse)[0]);
});

router.route('/').post(async (req, res) => {
  const task = await taskService.postTask(req.baseUrl.split('/')[2], req.body);
  res.json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = await taskService.putTask(
    req.baseUrl.split('/')[2],
    req.params.id,
    req.body
  );
  res.json(task.map(Task.toResponse)[0]);
});

router.route('/:id').delete(async (req, res) => {
  taskService
    .deleteTask(req.params.id)
    .then(task => {
      if (!task) {
        res
          .status(404)
          .send('Task not found')
          .end();
      } else {
        res.json(task.map(Task.toResponse));
        // res
        //   .status(204)
        //   .send('The task has been deleted')
        //   .end();
      }
    })
    .catch(() => {
      res.status(400).end();
    });
});

module.exports = router;
